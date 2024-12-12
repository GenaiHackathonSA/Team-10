import unittest
from unittest.mock import patch, MagicMock
from my_package.user_statistics_fetcher import fetch_user_statistics, clear_user_statistics_cache
from my_package.cache import statistics_cache

class TestUserStatisticsFetcher(unittest.TestCase):

    @patch('my_package.user_statistics_service.get_user_statistics')
    def test_fetch_user_statistics(self, mock_get_user_statistics):
        # Setup mock response and cache behavior
        mock_get_user_statistics.return_value = {'user_id': 1, 'statistics': 'Sample Data'}
        
        # First call should fetch from the service
        statistics = fetch_user_statistics(user_id=1)
        self.assertEqual(statistics, {'user_id': 1, 'statistics': 'Sample Data'})
        mock_get_user_statistics.assert_called_once_with(user_id=1)

        # Call again should fetch from the cache
        statistics = fetch_user_statistics(user_id=1)
        self.assertEqual(statistics, {'user_id': 1, 'statistics': 'Sample Data'})
        self.assertEqual(mock_get_user_statistics.call_count, 1)  # Should still be 1 call

        # Clear the cache and ensure that the service is called again
        clear_user_statistics_cache()
        
        # Fetching after clearing the cache
        statistics = fetch_user_statistics(user_id=1)
        self.assertEqual(statistics, {'user_id': 1, 'statistics': 'Sample Data'})
        mock_get_user_statistics.assert_called_with(user_id=1)  # Should have been called again

    def test_clear_user_statistics_cache(self):
        # Set some dummy data in the cache
        statistics_cache['user_id_1'] = {'user_id': 1, 'statistics': 'Sample Data'}
        
        # Ensure cache is not empty before clear
        self.assertIn('user_id_1', statistics_cache)

        # Clear the cache
        clear_user_statistics_cache()

        # Ensure the cache is now empty
        self.assertNotIn('user_id_1', statistics_cache)

if __name__ == '__main__':
    unittest.main()
