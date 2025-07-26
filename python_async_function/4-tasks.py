#!/usr/bin/env python3
"""
Defines a function that runs multiple task_wait_random
coroutines concurrently and returns their delays in ascending
order of completion.
"""
import asyncio
from typing import List

task_wait_random = __import__('3-tasks').task_wait_random


async def task_wait_n(n: int, max_delay: int) -> List[float]:
    """
    Spawn task_wait_random max_delay n times, run them concurrently,
    and return a list of delays in the order they finish.
    """
    tasks: List[asyncio.Task] = [task_wait_random(max_delay) for _ in range(n)]
    delays: List[float] = []
    for completed in asyncio.as_completed(tasks):
        delay: float = await completed
        delays.append(delay)
    return delays
