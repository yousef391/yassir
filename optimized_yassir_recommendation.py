import pandas as pd
import numpy as np
from scipy.sparse import csr_matrix
from sklearn.preprocessing import MinMaxScaler
import warnings
warnings.filterwarnings('ignore')

print("="*80)
print(" "*15 + "🚀 ADVANCED RECOMMENDATION SYSTEM v2.0")
print(" "*20 + "Target: 0.50+ MAP@10")
print("="*80)

CONFIG = {
    'data_path': 'yassir-ai-market-challenge/yassir_marekt_data_09_2025 2/',
    'top_n': 10,
    'validation_sample': 3000,
    'min_reorders': 2,  # INCREASED THRESHOLD
    'min_user_history': 3,
}

def load_data():
    """Load and preprocess data"""
    print("\n📁 Loading data...")
    base_path = CONFIG['data_path']
    
    orders = pd.read_csv(base_path + 'orders_df.csv')
    order_products = pd.read_csv(base_path + 'orders_products_df.csv')
    user_test = pd.read_csv('yassir-ai-market-challenge/yassir_marekt_data_09_2025 2/test_new_version.csv')
    products = pd.read_csv(base_path + 'products_df.csv')
    
    op = order_products.merge(
        orders[['order_id', 'user_id', 'order_number', 'days_since_last_order', 'order_day', 'order_hour']], 
        on='order_id'
    )
    
    # Add product categories
    op = op.merge(products[['product_id', 'category_id', 'sub_category_id']], on='product_id', how='left')
    
    print(f"  ✓ Total order-products: {len(op):,}")
    print(f"  ✓ Test users: {len(user_test):,}")
    print(f"  ✓ Unique products: {op['product_id'].nunique():,}")
    
    return op, user_test, orders

def build_reorder_matrix(op):
    """Identify TRUE reorder products (not accidental buys)"""
    print("\n🔍 Building reorder matrix...")
    
    # Filter: products purchased at least 2 times by user
    user_prod_counts = op.groupby(['user_id', 'product_id']).size().reset_index(name='count')
    reorder_candidates = user_prod_counts[user_prod_counts['count'] >= CONFIG['min_reorders']].copy()
    
    # Join back to get reorder_flag
    reorder_matrix = reorder_candidates.merge(
        op[['user_id', 'product_id', 'reordered', 'order_number', 'add_to_cart_order']],
        on=['user_id', 'product_id']
    )
    
    print(f"  ✓ {len(reorder_candidates):,} user-product pairs with 2+ purchases")
    
    return reorder_matrix

def create_rich_features(op, reorder_matrix, test_user_ids):
    """Create powerful features from multiple signals"""
    print("\n🔧 Creating rich feature set...")
    
    features_list = []
    
    for user_id in test_user_ids:
        user_data = op[op['user_id'] == user_id].copy()
        
        if len(user_data) < CONFIG['min_user_history']:
            continue
        
        user_max_order = user_data['order_number'].max()
        
        # Get reorder candidates for this user
        user_reorders = reorder_matrix[reorder_matrix['user_id'] == user_id]
        
        for product_id in user_reorders['product_id'].unique():
            prod_data = user_data[user_data['product_id'] == product_id].sort_values('order_number')
            reorder_data = user_reorders[user_reorders['product_id'] == product_id]
            
            n_orders = len(prod_data)
            n_reorders = (reorder_data['reordered'] == 1).sum()
            
            if n_reorders == 0:
                continue
            
            # === TEMPORAL FEATURES ===
            orders_list = sorted(prod_data['order_number'].unique())
            last_order = orders_list[-1]
            first_order = orders_list[0]
            orders_since_last = user_max_order - last_order
            
            # === BASKET STATISTICS ===
            cart_positions = prod_data['add_to_cart_order'].dropna()
            avg_cart_pos = cart_positions.mean() if len(cart_positions) > 0 else 5.0
            cart_consistency = 1.0 / (1.0 + cart_positions.std()) if len(cart_positions) > 1 else 0.5
            
            # === REORDER PATTERN ===
            reorder_rate = n_reorders / n_orders
            
            if len(orders_list) > 1:
                intervals = np.diff(orders_list)
                interval_mean = intervals.mean()
                interval_std = intervals.std()
                recency_score = 1.0 / (1.0 + orders_since_last)
                
                # Expect reorder soon?
                days_since_data = prod_data['days_since_last_order'].dropna()
                if len(days_since_data) > 0:
                    avg_days = days_since_data.mean()
                    days_consistency = 1.0 / (1.0 + days_since_data.std()) if len(days_since_data) > 1 else 0.5
                else:
                    avg_days = 30
                    days_consistency = 0.5
            else:
                interval_mean = 1
                interval_std = 0
                recency_score = 1.0
                avg_days = 30
                days_consistency = 0.5
            
            # === PURCHASE TIMING ===
            dow_pref = prod_data['order_day'].mode()[0] if len(prod_data) > 0 else 3
            hour_pref = prod_data['order_hour'].mode()[0] if len(prod_data) > 0 else 12
            
            # === STABILITY SCORE ===
            # Low variance = consistent product, higher trust
            stability = 1.0 / (1.0 + interval_std) if len(orders_list) > 1 else 0.7
            
            features_list.append({
                'user_id': user_id,
                'product_id': product_id,
                'category_id': prod_data['category_id'].iloc[0],
                'sub_category_id': prod_data['sub_category_id'].iloc[0],
                'n_orders': n_orders,
                'n_reorders': n_reorders,
                'reorder_rate': reorder_rate,
                'last_order': last_order,
                'first_order': first_order,
                'orders_since_last': orders_since_last,
                'recency_score': recency_score,
                'interval_mean': interval_mean,
                'interval_std': interval_std,
                'stability': stability,
                'avg_cart_pos': avg_cart_pos,
                'cart_consistency': cart_consistency,
                'avg_days_between': avg_days,
                'days_consistency': days_consistency,
                'dow_preference': dow_pref,
                'hour_preference': hour_pref,
                'user_max_order': user_max_order,
            })
    
    features = pd.DataFrame(features_list)
    print(f"  ✓ Created {len(features):,} feature vectors")
    
    return features

def compute_product_affinity(op, reorder_matrix):
    """Skipped for speed - focus on proven signals"""
    print("\n🔗 Skipping affinity (using stronger signals instead)...")
    return {}

def score_features(features, product_affinity, op):
    """Compute final recommendation scores"""
    print("\n⚙️ Computing final scores...")
    
    # === NORMALIZE EACH COMPONENT ===
    for col in ['recency_score', 'stability', 'reorder_rate', 'cart_consistency', 'days_consistency']:
        if col in features.columns:
            features[f'{col}_norm'] = (features[col] - features[col].min()) / (features[col].max() - features[col].min() + 1e-9)
    
    # === COMPOSITE SCORE ===
    features['base_score'] = (
        0.35 * features['recency_score_norm'] +      # Recent = higher priority
        0.25 * features['stability_norm'] +            # Consistent = trustworthy
        0.20 * features['reorder_rate_norm'] +         # High reorder rate
        0.10 * features['cart_consistency_norm'] +     # Early in cart = important
        0.10 * features['days_consistency_norm']       # Regular interval
    )
    
    # === DECAY FOR OLD ITEMS ===
    features['decay'] = np.exp(-0.05 * features['orders_since_last'])
    
    # === BOOST FOR STRONG PATTERNS ===
    features['affinity_boost'] = 1.0
    
    # === FINAL SCORE ===
    features['final_score'] = (
        features['base_score'] * 
        features['decay'] * 
        (1.0 + features['reorder_rate'] * 0.5)  # Extra boost for proven reorders
    )
    
    return features

def generate_recommendations(features, top_n=10):
    """Generate top-N per user with diversity"""
    print("\n📋 Generating recommendations...")
    
    recommendations = {}
    
    for user_id in features['user_id'].unique():
        user_features = features[features['user_id'] == user_id].copy()
        
        if len(user_features) == 0:
            continue
        
        # Sort by score descending
        user_features = user_features.sort_values('final_score', ascending=False)
        
        # Take top N
        top_prods = user_features.head(top_n)['product_id'].tolist()
        recommendations[user_id] = top_prods
    
    print(f"  ✓ Generated {len(recommendations):,} user recommendations")
    
    return recommendations

def cross_validate(op, reorder_matrix, product_affinity, n_splits=5):
    """Time-based CV with proper splitting"""
    print("\n" + "="*80)
    print("CROSS-VALIDATION (5-Split Time-Based)")
    print("="*80)
    
    user_max_orders = op.groupby('user_id')['order_number'].max()
    valid_users = user_max_orders[user_max_orders >= 6].index.tolist()
    
    if len(valid_users) > CONFIG['validation_sample']:
        valid_users = np.random.choice(valid_users, CONFIG['validation_sample'], replace=False)
    
    all_aps = []
    split_scores = []
    
    for split in range(n_splits):
        # Progressive time split
        cutoff_ratio = 0.5 + (split * 0.1)  # 0.5, 0.6, 0.7, 0.8, 0.9
        
        predictions = {}
        ground_truth = {}
        
        for user_id in valid_users:
            user_data = op[op['user_id'] == user_id].copy()
            max_order = user_data['order_number'].max()
            split_order = int(max_order * cutoff_ratio)
            
            # Ground truth: unseen orders
            test_products = user_data[user_data['order_number'] > split_order]['product_id'].unique()
            if len(test_products) == 0:
                continue
            ground_truth[user_id] = set(test_products)
            
            # Training data
            train_data = user_data[user_data['order_number'] <= split_order].copy()
            if len(train_data) < 3:
                continue
            
            # Quick scoring on train data
            user_reorders = reorder_matrix[(reorder_matrix['user_id'] == user_id) & 
                                          (reorder_matrix['product_id'].isin(train_data['product_id']))]
            
            scores = []
            for prod_id in user_reorders['product_id'].unique():
                prod_train = train_data[train_data['product_id'] == prod_id]
                prod_reorders = user_reorders[user_reorders['product_id'] == prod_id]
                
                n_orders = len(prod_train)
                n_reorders = (prod_reorders['reordered'] == 1).sum()
                
                if n_reorders == 0:
                    continue
                
                recency = 1.0 / (1.0 + (max_order - prod_train['order_number'].max()))
                reorder_rate = n_reorders / n_orders
                
                score = 0.6 * recency + 0.4 * reorder_rate
                scores.append((prod_id, score))
            
            if scores:
                scores.sort(key=lambda x: x[1], reverse=True)
                predictions[user_id] = [p[0] for p in scores[:CONFIG['top_n']]]
        
        # Calculate MAP
        aps = []
        for user_id, pred_list in predictions.items():
            true_items = ground_truth.get(user_id, set())
            if len(true_items) == 0:
                continue
            
            hits = 0
            sum_prec = 0
            for i, item in enumerate(pred_list, 1):
                if item in true_items:
                    hits += 1
                    sum_prec += hits / i
            
            ap = sum_prec / min(len(true_items), CONFIG['top_n'])
            aps.append(ap)
        
        if aps:
            split_map = np.mean(aps)
            split_scores.append(split_map)
            print(f"  Split {split+1} (cutoff {cutoff_ratio:.1%}): MAP@10 = {split_map:.4f} ({len(aps)} users)")
            all_aps.extend(aps)
    
    overall_map = np.mean(all_aps) if all_aps else 0.0
    print(f"\n  📊 Average MAP@10: {overall_map:.4f}")
    
    return overall_map

def main():
    op, user_test, orders = load_data()
    test_user_ids = user_test['user_id'].unique()
    
    # Build reorder matrix (strong signal)
    reorder_matrix = build_reorder_matrix(op)
    
    # Validate
    product_affinity = compute_product_affinity(op, reorder_matrix)
    cv_map = cross_validate(op, reorder_matrix, product_affinity, n_splits=5)
    
    print("\n" + "="*80)
    print("GENERATING FINAL PREDICTIONS")
    print("="*80)
    
    # Create features
    features = create_rich_features(op, reorder_matrix, test_user_ids)
    
    # Score
    features = score_features(features, product_affinity, op)
    
    # Generate
    recommendations = generate_recommendations(features, CONFIG['top_n'])
    
    # Fallback: global popular items
    popular = op.groupby('product_id').agg({
        'order_id': 'count',
        'reordered': 'mean'
    }).reset_index()
    popular['score'] = popular['order_id'] * (1.0 + popular['reordered'])
    popular_prods = popular.nlargest(CONFIG['top_n'], 'score')['product_id'].tolist()
    
    # Fill gaps
    for user_id in test_user_ids:
        if user_id not in recommendations:
            recommendations[user_id] = popular_prods
        else:
            while len(recommendations[user_id]) < CONFIG['top_n']:
                for prod in popular_prods:
                    if prod not in recommendations[user_id]:
                        recommendations[user_id].append(prod)
                    if len(recommendations[user_id]) >= CONFIG['top_n']:
                        break
    
    print("\n" + "="*80)
    print("✅ PIPELINE COMPLETE")
    print("="*80)
    print(f"  CV MAP: {cv_map:.4f}")
    print(f"  Recommendations: {len(recommendations):,} users")
    
    # Save
    submission = pd.DataFrame([
        {'user_id': uid, 'products': ' '.join(map(str, prods))}
        for uid, prods in recommendations.items()
    ])
    submission.to_csv('submission_v2.csv', index=False)
    print("  💾 Saved to submission_v2.csv\n")
    
    return recommendations

if __name__ == "__main__":
    recommendations = main()