import pandas as pd
import numpy as np
from collections import defaultdict, Counter
import warnings
warnings.filterwarnings('ignore')

class FastYassirRecommendationSystem:
    def __init__(self):
        self.product_popularity = Counter()
        self.user_product_history = defaultdict(set)
        self.reorder_stats = defaultdict(dict)
        self.category_preferences = defaultdict(Counter)
        self.test_users = None
        self.products_df = None
        
    def load_data_fast(self, data_path):
        """Load data quickly using sampling"""
        print("Loading data with sampling...")
        
        # Load essential datasets
        self.products_df = pd.read_csv(f"{data_path}/products_df.csv")
        self.test_users = pd.read_csv(f"{data_path}/test_new_version.csv")
        
        print(f"Loaded {len(self.products_df)} products")
        print(f"Test set contains {len(self.test_users)} users")
        
        # Sample data for faster processing
        self.process_sampled_data(data_path)
        
    def process_sampled_data(self, data_path):
        """Process a sample of the data for speed"""
        print("Processing sampled data...")
        
        # Sample orders_df (take every 10th row for speed)
        print("Sampling orders...")
        orders_sample = pd.read_csv(f"{data_path}/orders_df.csv", skiprows=lambda x: x % 10 != 0)
        print(f"Sampled {len(orders_sample)} orders")
        
        # Create order_id to user_id mapping
        order_user_map = dict(zip(orders_sample['order_id'], orders_sample['user_id']))
        
        # Sample orders_products_df (take every 20th row for speed)
        print("Sampling order products...")
        chunk_size = 1000000
        sample_count = 0
        
        for chunk in pd.read_csv(f"{data_path}/orders_products_df.csv", chunksize=chunk_size):
            # Take every 20th row
            sampled_chunk = chunk.iloc[::20]
            
            for _, row in sampled_chunk.iterrows():
                order_id = row['order_id']
                product_id = row['product_id']
                reordered = row['reordered']
                
                # Get user_id from mapping
                if order_id in order_user_map:
                    user_id = order_user_map[order_id]
                    
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
            
            sample_count += len(sampled_chunk)
            if sample_count % 100000 == 0:
                print(f"Processed {sample_count} sampled order-products...")
        
        print(f"Processed {sample_count} sampled order-products")
        print(f"Found {len(self.user_product_history)} users with purchase history")
        
    def get_popular_products(self, n_recommendations=6):
        """Get most popular products"""
        return [product_id for product_id, count in self.product_popularity.most_common(n_recommendations)]
    
    def get_user_predictions(self, user_id, n_recommendations=6):
        """Get predictions for a specific user"""
        if user_id not in self.user_product_history:
            return self.get_popular_products(n_recommendations)
        
        user_products = self.user_product_history[user_id]
        recommendations = []
        
        # Strategy 1: High reorder probability products
        reorder_candidates = []
        for product_id in user_products:
            key = f"{user_id}_{product_id}"
            if key in self.reorder_stats:
                stats = self.reorder_stats[key]
                reorder_rate = stats['reordered'] / stats['total'] if stats['total'] > 0 else 0
                if reorder_rate > 0.2:  # Lower threshold for more candidates
                    reorder_candidates.append((product_id, reorder_rate))
        
        reorder_candidates.sort(key=lambda x: x[1], reverse=True)
        
        # Strategy 2: Category-based recommendations
        category_candidates = []
        if user_id in self.category_preferences:
            user_categories = self.category_preferences[user_id]
            top_categories = [cat for cat, count in user_categories.most_common(5)]  # More categories
            
            for _, row in self.products_df.iterrows():
                if row['category_id'] in top_categories and row['product_id'] not in user_products:
                    popularity = self.product_popularity[row['product_id']]
                    category_candidates.append((row['product_id'], popularity))
        
        category_candidates.sort(key=lambda x: x[1], reverse=True)
        
        # Strategy 3: Popular products not purchased
        popular_candidates = []
        for product_id, count in self.product_popularity.most_common(200):  # More popular products
            if product_id not in user_products:
                popular_candidates.append(product_id)
        
        # Combine strategies with smart weighting
        recommendations = []
        
        # Add reorder candidates (highest priority)
        for product_id, rate in reorder_candidates[:2]:
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
        """Fast collaborative filtering using product co-occurrence"""
        if user_id not in self.user_product_history:
            return self.get_popular_products(n_recommendations)
        
        user_products = self.user_product_history[user_id]
        product_scores = defaultdict(float)
        
        # Find products frequently bought with user's products
        for product_id in user_products:
            # Count how many times this product appears with others
            for other_user, other_products in self.user_product_history.items():
                if other_user != user_id and product_id in other_products:
                    for other_product in other_products:
                        if other_product not in user_products:
                            product_scores[other_product] += 1
        
        # Sort by score
        recommendations = sorted(product_scores.items(), key=lambda x: x[1], reverse=True)
        return [product_id for product_id, score in recommendations[:n_recommendations]]
    
    def hybrid_predictions(self, user_id, n_recommendations=6):
        """Generate hybrid predictions"""
        # Get predictions from different methods
        user_preds = self.get_user_predictions(user_id, n_recommendations)
        collab_preds = self.get_collaborative_predictions(user_id, n_recommendations)
        
        # Combine with smart weighting
        all_predictions = []
        
        # User-based predictions (higher weight)
        for i, product_id in enumerate(user_preds):
            score = 0.6 * (1.0 / (i + 1))
            all_predictions.append((product_id, score))
        
        # Collaborative predictions
        for i, product_id in enumerate(collab_preds):
            score = 0.4 * (1.0 / (i + 1))
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
        """Generate submission file quickly"""
        print("Generating predictions for test users...")
        
        predictions = []
        for idx, row in self.test_users.iterrows():
            user_id = row['user_id']
            user_predictions = self.hybrid_predictions(user_id, n_recommendations=6)
            predictions.append({
                'user_id': user_id,
                'product_ids': ' '.join(map(str, user_predictions))
            })
            
            if (idx + 1) % 5000 == 0:
                print(f"Processed {idx + 1}/{len(self.test_users)} users")
        
        # Create submission DataFrame
        submission_df = pd.DataFrame(predictions)
        submission_df.to_csv(output_file, index=False)
        
        print(f"Submission file saved as {output_file}")
        print(f"Total predictions: {len(submission_df)}")
        
        return submission_df

def main():
    # Initialize recommendation system
    rec_system = FastYassirRecommendationSystem()
    
    # Load data
    data_path = "yassir-ai-market-challenge/yassir_marekt_data_09_2025 2"
    rec_system.load_data_fast(data_path)
    
    # Generate submission
    submission_df = rec_system.generate_submission('yassir_submission.csv')
    
    print("\nSubmission preview:")
    print(submission_df.head())
    
    print(f"\nSubmission file created: yassir_submission.csv")
    print("Ready for Kaggle submission!")

if __name__ == "__main__":
    main()

