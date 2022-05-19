import time

with open('log.txt', 'w') as f:
    f.write("Message from Python!")

time.sleep(2)

with open('log.txt', 'w') as f:
    f.write("Second line")

time.sleep(2)

with open('log.txt', 'w') as f:
    f.write("Third line")

time.sleep(2)

with open('log.txt', 'w') as f:
    f.write("The end.")
