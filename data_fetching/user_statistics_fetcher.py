import time
import functools
from user_statistics_service import get_user_statistics  # Make sure to import the existing function

# Dictionary to store cached statistics
user_statistics_cache = {}
CACHE_EXPIRY_TIME = 300  # Cache expiry time in seconds

def fetch_user_statistics(user_id):
    """This function will handle the retrieval of user statistics in an optimized manner to reduce continuous API calls.
    It will implement caching mechanisms to store already fetched data. This function will use the existing function 
    'get_user_statistics' for fetching data if not available in cache.
    """
    current_time = time.time()
    
    # Check if the data is in cache and hasn't expired
    if user_id in user_statistics_cache:
        cached_data, cache_time = user_statistics_cache[user_id]
        if current_time - cache_time < CACHE_EXPIRY_TIME:
            return cached_data
    
    # If data is not cached or has expired, fetch it from the service
    try:
        statistics = get_user_statistics(user_id)
        # Update the cache
        user_statistics_cache[user_id] = (statistics, current_time)  # Store statistics and the time fetched
        return statistics
    except Exception as e:
        # Log the exception (In production, you might want to use logging)
        print(f"Error fetching user statistics for user_id {user_id}: {e}")
        return None  # Returning None could be a signal for the caller to handle error

def clear_user_statistics_cache():
    """This function will be responsible for clearing the cached user statistics after a specified condition or time period.
    This function will be used internally within 'user_statistics_fetcher.py' to manage cache effectively.
    """
    global user_statistics_cache
    user_statistics_cache.clear()  # Clear the entire cache
    print("User statistics cache cleared.")
