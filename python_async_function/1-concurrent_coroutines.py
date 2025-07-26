#!/usr/bin/env python3
"""
Defines wait_n which runs multiple wait_random
coroutines concurrently and returns their delays in
ascending order of completion.
"""
import asyncio
from typing import List

wait_random = __import__('0-basic_async_syntax').wait_random


async def wait_n(n: int, max_delay: int) -> List[float]:
    """
    Spawn wait_random n times with the given max_delay, run them
    concurrently, and return a list of delays in the order they finish.
    """
    tasks = [asyncio.create_task(wait_random(max_delay)) for _ in range(n)]
    delays: List[float] = []
    for coro in asyncio.as_completed(tasks):
        delay = await coro
        delays.append(delay)
    return delays
