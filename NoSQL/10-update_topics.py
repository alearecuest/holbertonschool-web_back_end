#!/usr/bin/env python3
"""
Function that changes all topics of a school document based on the name.
"""

def update_topics(mongo_collection, name, topics):
    """
    Changes the list of 'topics' for all school documents that
    match the given name.

    Args:
        mongo_collection: pymongo Collection object.
        name (str): Name of the school to update.
        topics (list[str]): List of topics to set.

    Returns:
        None
    """
    mongo_collection.update_many(
        {"name": name},
        {"$set": {"topics": topics}}
    )
