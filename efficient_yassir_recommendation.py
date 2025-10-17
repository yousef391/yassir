import pandas as pd
import numpy as np
from collections import defaultdict, Counter
import warnings
warnings.filterwarnings('ignore')

class EfficientYassirRecommendationSystem:
    def __init__(self):
        self.user_product_history = defaultdict(set)
        self.product_popularity = Counter()
        self.user_stats = defaultdict(dict)
        self.product_stats = defaultdict(dict)
        self.category_preferences = defaultdict(Counter)
        self.reorder_stats = defaultdict(dict)
        self.test_users = None
        self.products_df = None
        self.users_df = None
        
    def load_data(self, data_path):
        """Load data efficiently"""
        print("Loading data...")
        
        # Load smaller datasets
        self.products_df = pd.read_csv(f"{data_path}/products_df.csv")
        self.users_df = pd.read_csv(f"{data_path}/users_df.csv")
        self.test_users = pd.read_csv(f"{data_path}/test_new_version.csv")
        
        print(f"Loaded {len(self.products_df)} products, {len(self.users_df)} users")
        print(f"Test set contains {len(self.test_users)} users")
        
        # Process data efficiently
        self.process_data_efficiently(data_path)
        
    def process_data_efficiently(self, data_path):
        """Process data using efficient methods"""
        print("Processing data efficiently...")
        
        # Read orders_df and create user stats
        print("Processing orders...")
        orders_df = pd.read_csv(f"{data_path}/orders_df.csv")
        
        # User order statistics
        user_order_stats = orders_df.groupby('user_id').agg({
            'order_id': 'count',
            'order_number': 'max',
            'days_since_last_order': 'mean'
        }).rename(columns={'order_id': 'total_orders'})
        
        for user_id, row in user_order_stats.iterrows():
            self.user_stats[user_id] = {
                'total_orders': row['total_orders'],
                'max_order_number': row['order_number'],
                'avg_days_since_last_order': row['days_since_last_order']
            }
        
        print(f"Processed {len(user_order_stats)} users")
        
        # Process orders_products_df in chunks
        print("Processing order products...")
        chunk_size = 500000
        total_processed = 0
        
        for chunk in pd.read_csv(f"{data_path}/orders_products_df.csv", chunksize=chunk_size):
            for _, row in chunk.iterrows():
                order_id = row['order_id']
                product_id = row['product_id']
                reordered = row['reordered']
                
                # Get user_id for this order (simplified approach)
                # We'll use a mapping approach
                user_id = self.get_user_for_order_simple(order_id, orders_df)
                if user_id is None:
                    continue
                
                # Update user-product history
                self.user_product_history[user_id].add(product_id)
                
                # Update popularity
                self.product_popularity[product_id] += 1
                
                # Update reorder stats
                key = f"{user_id}_{product_id}"
                if key not in self.reorder_stats:
                    self.reorder_stats[key] = {'total': 0, 'reordered': 0}
                self.reorder_stats[key]['total'] += 1
                self.reorder_stats[key]['reordered'] += reordered
                
                # Update category preferences
                product_info = self.products_df[self.products_df['product_id'] == product_id]
                if not product_info.empty:
                    category_id = product_info.iloc[0]['category_id']
                    self.category_preferences[user_id][category_id] += 1
            
            total_processed += len(chunk)
            if total_processed % 1000000 == 0:
                print(f"Processed {total_processed} order-products...")
        
        print(f"Processed {total_processed} order-products")
        
    def get_user_for_order_simple(self, order_id, orders_df):
        """Get user_id for order using pre-loaded orders_df"""
        try:
            user_row = orders_df[orders_df['order_id'] == order_id]
            if not user_row.empty:
                return user_row.iloc[0]['user_id']
        except:
            pass
        return None
    
    def get_popular_products(self, n_recommendations=6):
        """Get most popular products"""
        return [product_id for product_id, count in self.product_popularity.most_common(n_recommendations)]
    
    def get_user_based_predictions(self, user_id, n_recommendations=6):
        """Get predictions based on user behavior patterns"""
        if user_id not in self.user_product_history:
            return self.get_popular_products(n_recommendations)
        
        user_products = self.user_product_history[user_id]
        
        # Strategy 1: Reorder predictions
        reorder_candidates = []
        for product_id in user_products:
            key = f"{user_id}_{product_id}"
            if key in self.reorder_stats:
                stats = self.reorder_stats[key]
                reorder_rate = stats['reordered'] / stats['total'] if stats['total'] > 0 else 0
                if reorder_rate > 0.3:  # High reorder probability
                    reorder_candidates.append((product_id, reorder_rate))
        
        reorder_candidates.sort(key=lambda x: x[1], reverse=True)
        
        # Strategy 2: Category-based recommendations
        category_candidates = []
        if user_id in self.category_preferences:
            user_categories = self.category_preferences[user_id]
            top_categories = [cat for cat, count in user_categories.most_common(3)]
            
            for _, row in self.products_df.iterrows():
                if row['category_id'] in top_categories and row['product_id'] not in user_products:
                    popularity = self.product_popularity[row['product_id']]
                    category_candidates.append((row['product_id'], popularity))
        
        category_candidates.sort(key=lambda x: x[1], reverse=True)
        
        # Strategy 3: Popular products not yet purchased
        popular_candidates = []
        for product_id, count in self.product_popularity.most_common(100):
            if product_id not in user_products:
                popular_candidates.append(product_id)
        
        # Combine strategies
        recommendations = []
        
        # Add reorder candidates (high priority)
        for product_id, rate in reorder_candidates[:3]:
            recommendations.append(product_id)
        
        # Add category-based candidates
        for product_id, pop in category_candidates[:2]:
            if product_id not in recommendations:
                recommendations.append(product_id)
        
        # Fill remaining with popular products
        for product_id in popular_candidates:
            if product_id not in recommendations and len(recommendations) < n_recommendations:
                recommendations.append(product_id)
        
        return recommendations[:n_recommendations]
    
    def get_collaborative_predictions(self, user_id, n_recommendations=6):
        """Simplified collaborative filtering"""
        if user_id not in self.user_product_history:
            return self.get_popular_products(n_recommendations)
        
        user_products = self.user_product_history[user_id]
        scores = defaultdict(float)
        
        # Find products frequently bought together
        for product_id in user_products:
            # Get other users who bought this product
            other_users = set()
            for other_user, products in self.user_product_history.items():
                if other_user != user_id and product_id in products:
                    other_users.add(other_user)
            
            # Score products bought by these users
            for other_user in other_users:
                other_products = self.user_product_history[other_user]
                for other_product in other_products:
                    if other_product not in user_products:
                        scores[other_product] += 1
        
        # Sort by score
        recommendations = sorted(scores.items(), key=lambda x: x[1], reverse=True)
        return [product_id for product_id, score in recommendations[:n_recommendations]]
    
    def hybrid_predictions(self, user_id, n_recommendations=6):
        """Generate hybrid predictions"""
        # Get predictions from different methods
        user_preds = self.get_user_based_predictions(user_id, n_recommendations)
        collab_preds = self.get_collaborative_predictions(user_id, n_recommendations)
        
        # Combine with weights
        all_predictions = []
        
        # User-based predictions (higher weight)
        for i, product_id in enumerate(user_preds):
            score = 0.7 * (1.0 / (i + 1))
            all_predictions.append((product_id, score))
        
        # Collaborative predictions
        for i, product_id in enumerate(collab_preds):
            score = 0.3 * (1.0 / (i + 1))
            all_predictions.append((product_id, score))
        
        # Aggregate scores
        final_scores = defaultdict(float)
        for product_id, score in all_predictions:
            final_scores[product_id] += score
        
        # Sort by final score
        recommendations = sorted(final_scores.items(), key=lambda x: x[1], reverse=True)
        
        # Ensure we have enough recommendations
        final_recommendations = [product_id for product_id, score in recommendations[:n_recommendations]]
        
        # Fill with popular products if needed
        while len(final_recommendations) < n_recommendations:
            for popular_product in self.get_popular_products(100):
                if popular_product not in final_recommendations:
                    final_recommendations.append(popular_product)
                    break
        
        return final_recommendations[:n_recommendations]
    
    def generate_submission(self, output_file='yassir_submission.csv'):
        """Generate submission file"""
        print("Generating predictions for test users...")
        
        predictions = []
        for idx, row in self.test_users.iterrows():
            user_id = row['user_id']
            user_predictions = self.hybrid_predictions(user_id, n_recommendations=6)
            predictions.append({
                'user_id': user_id,
                'product_ids': ' '.join(map(str, user_predictions))
            })
            
            if (idx + 1) % 1000 == 0:
                print(f"Processed {idx + 1}/{len(self.test_users)} users")
        
        # Create submission DataFrame
        submission_df = pd.DataFrame(predictions)
        submission_df.to_csv(output_file, index=False)
        
        print(f"Submission file saved as {output_file}")
        print(f"Total predictions: {len(submission_df)}")
        
        return submission_df

def main():
    # Initialize recommendation system
    rec_system = EfficientYassirRecommendationSystem()
    
    # Load data
    data_path = "yassir-ai-market-challenge/yassir_marekt_data_09_2025 2"
    rec_system.load_data(data_path)
    
    # Generate submission
    submission_df = rec_system.generate_submission('yassir_submission.csv')
    
    print("\nSubmission preview:")
    print(submission_df.head())
    
    print(f"\nSubmission file created: yassir_submission.csv")
    print("Ready for Kaggle submission!")

if __name__ == "__main__":
    main()
