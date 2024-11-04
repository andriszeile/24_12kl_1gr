vards = input("Ievadi lietotāja vārdu: ")
with open("name.txt", "a") as f:
    f.write(vards + "\n")
print("Vārds ir saglabāts failā.")