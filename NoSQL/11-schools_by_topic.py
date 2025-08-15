#!/usr/bin/env python3
"""
Function that returns the list of school having a specific topic
"""


def schools_by_topic(mongo_collection, topic):
    """
    Return a list of school documents where 'topics' contains the given topic.

    Args:
        mongo_collection: pymongo collection object.
        topic (str): Topic to search for.

    Returns:
        list[dict]: Matching documents.
    """

    return list(mongo_collection.find({"topics": topic}))
