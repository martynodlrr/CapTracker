def normalize_data(arr):
    obj = {}
    if arr:
        if not len(arr):
            return {}
        for el in arr:
            obj[el['id']] = el
    return obj
