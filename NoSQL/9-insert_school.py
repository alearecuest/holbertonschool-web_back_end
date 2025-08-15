#!/usr/bin/env python3

"""
Function that inserts a new document in a collection based on kwargs
"""

def insert_school(mongo_collection, **kwargs):
    """
    Inserts a document into the collection using the key-value
    pairs in kwargs. Returns the ObjectId of the new document.
    """

    result = mongo_collection.insert_one(kwargs)
    return  result.inserted_id
