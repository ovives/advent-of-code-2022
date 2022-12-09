def is_range_a_in_range_b(range_a, range_b):
    start_a, end_a = map(int, range_a.split('-'))
    start_b, end_b = map(int, range_b.split('-'))
    return start_b <= start_a and end_a <= end_b

with open('input', 'r') as f:
    lines = f.readlines()
    assignment_pairs = [entry.strip() for entry in lines]

number_of_contains = 0
for assignment_pair in assignment_pairs:
    first_range, second_range = assignment_pair.split(',')
    if is_range_a_in_range_b(first_range, second_range) or is_range_a_in_range_b(second_range, first_range):
        number_of_contains += 1

number_of_overlaps = 0
for assignment_pair in assignment_pairs:
    first_range, second_range = assignment_pair.split(',')
    start_a, end_a = map(int, first_range.split('-'))
    start_b, end_b = map(int, second_range.split('-'))
    if start_a in range(start_b, end_b+1) or end_a in range(start_b, end_b+1) or  start_b in range(start_a, end_a+1) or end_b in range(start_a, end_a+1):
        number_of_overlaps += 1

print(f'''Part 1: {number_of_contains}''')
print(f'''Part 2: {number_of_overlaps}''')