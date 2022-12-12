import re
import math

stacks = [[],[],[],[],[],[],[],[],[]]
movements = []

def parse_stack_row(row):
  for i in range(0, len(row)):
    if (row[i] != ' ' and (i-1)%4 == 0):
      index = math.floor((i-1) / 4)
      stacks[index].append(row[i])

def parse_movements_row(row):
  clean_row = re.findall(r'[0-9]+', row)
  int_row = [int(i) for i in clean_row]
  movements.append(int_row)

def build_initial_data(data):
  read_stacks = True
  read_movements = False
  for datum in data:
    if (len(datum) < 2):
      continue
    if (datum[1] == '1'):
      read_movements = True
      read_stacks = False
      continue
    if (read_stacks):
      parse_stack_row(datum)
    if (read_movements):
      parse_movements_row(datum)

def make_movement(movement):
  for i in range(0, movement[0]):
    stacks[movement[2]-1].insert(0, stacks[movement[1]-1][0])
    stacks[movement[1]-1] = stacks[movement[1]-1][1:]

def make_9001_movement(movement):
  stacks[movement[2]-1].insert(0, stacks[movement[1]-1][:movement[0]])
  stacks[movement[1]-1] = stacks[movement[1]-1][movement[0]:]
  stacks[movement[2]-1] = [item for sublist in stacks[movement[2]-1] for item in sublist]
  stacks[movement[1]-1] = [item for sublist in stacks[movement[1]-1] for item in sublist]

def get_tops(stacks):
  tops = []
  for stack in stacks:
    tops.append(stack[0])
  return ''.join(tops)

# Part one
with open('input', 'r') as f:
  data = f.readlines()

build_initial_data(data)
for movement in movements:
  make_movement(movement)

tops = get_tops(stacks)
print(f'''Part 1: {tops}''')

# Part two
stacks = [[],[],[],[],[],[],[],[],[]]
movements = []

with open('input', 'r') as f:
  data = f.readlines()

build_initial_data(data)
for movement in movements:
  make_9001_movement(movement)

tops = get_tops(stacks)
print(f'''Part 2: {tops}''')