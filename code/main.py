# Function to generate the initial set of knowledge for agent 1
def generateA1(num, N):
    pairs = set()
    for x in range(1, N + 1):
        for y in range(x, N + 1):
            if x + y == num:
                pairs.add((x, y))
    return pairs

# Function to generate the initial set of knowledge for agent 2
def generateA2(num, N):
    pairs = set()
    for x in range(1, N + 1):
        for y in range(x, N + 1):
            if x * y == num:
                pairs.add((x, y))
    return pairs


# Knowledge function for agent 1
def knowA1(num1, anouncments, N):
    if len(anouncments) == 0:
        return generateA1(num1, N)
    before = knowA1(num1, anouncments[:-1])
    for (x,y) in before:
        if x < N and y < N:
            if len(knowA2(x * y, anouncments[:-1])) == 1:
                before.remove((x,y))
    return before
            
# Knowledge function for agent 2
def knowA2(num1, anouncments, N):
    if len(anouncments) == 0:
        return generateA1(num1, N)
    before = knowA2(num1, anouncments[:-1])
    for (x,y) in before:
        if x < N and y < N:
            if len(knowA1(x + y, anouncments[:-1])) == 1:
                before.remove((x,y))
    return before


# Main function
if __name__ == '__main__':
    print(generateA1(10, 10))
    print(generateA2(16, 10))