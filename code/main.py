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
    if anouncments == 0:
        return generateA1(num1, N)
    before = knowA1(num1, anouncments - 1, N)
    for (x,y) in before:
        if x < N and y < N:
            if len(knowA2(x * y, anouncments - 1, N)) == 1:
                before.remove((x,y))
    return before
            
# Knowledge function for agent 2
def knowA2(num1, anouncments, N):
    if anouncments == 0:
        return generateA1(num1, N)
    before = knowA2(num1, anouncments - 1, N)
    for (x,y) in before:
        if x < N and y < N:
            if len(knowA1(x + y, anouncments - 1, N)) == 1:
                before.remove((x,y))
    return before


# Main function
if __name__ == '__main__':
    num1 = 10
    num2 = 16
    N = 10
    print(generateA1(num1, N))
    print(knowA1(num1, 0, N))
    print(knowA1(num1, 1, N))
    print(knowA1(num1, 2, N))
    
    print('==================================')
    print(generateA2(num2, N))
    print(knowA2(num2, 0, N))
    print(knowA2(num2, 1, N))
    print(knowA2(num2, 2, N))