import unittest
from unittest.mock import patch
from user_statistics_controller import retrieve_statistics
from user_statistics_fetcher import fetch_user_statistics

class TestUserStatisticsController(unittest.TestCase):

    @patch('user_statistics_fetcher.fetch_user_statistics')
    def test_retrieve_statistics(self, mock_fetch_user_statistics):
        # Arrange
        mock_statistics_data = {
            'total_income': 1000,
            'total_expense': 700,
            'remaining_balance': 300
        }
        
        mock_fetch_user_statistics.return_value = mock_statistics_data
        
        # Act
        response_data = retrieve_statistics(user_id=1)
        
        # Assert
        mock_fetch_user_statistics.assert_called_once_with(user_id=1)
        self.assertEqual(response_data['total_income'], 1000)
        self.assertEqual(response_data['total_expense'], 700)
        self.assertEqual(response_data['remaining_balance'], 300)

if __name__ == '__main__':
    unittest.main()
