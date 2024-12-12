# user_statistics_controller.py

from flask import Blueprint, jsonify, request
from user_statistics_fetcher import fetch_user_statistics

user_statistics_controller = Blueprint('user_statistics_controller', __name__)

@user_statistics_controller.route('/retrieve_statistics', methods=['GET'])
def retrieve_statistics():
    """
    This function will call 'fetch_user_statistics' from 'user_statistics_fetcher.py'
    to get the required user statistics. It will also handle any data processing needed
    before sending the response to the client.
    """
    try:
        # Retrieve user identifier, assuming it is provided as a query parameter
        user_id = request.args.get('user_id')
        if not user_id:
            return jsonify({'error': 'User ID is required.'}), 400

        # Fetch user statistics
        statistics = fetch_user_statistics(user_id)

        if statistics is None:
            return jsonify({'error': 'No statistics found for the given user.'}), 404

        # Here you can process the statistics if needed
        # For example, we may want to format it or calculate additional data

        return jsonify(statistics), 200

    except Exception as e:
        # Log the exception (logging mechanism to be implemented)
        return jsonify({'error': f'An unexpected error occurred: {str(e)}'}), 500
