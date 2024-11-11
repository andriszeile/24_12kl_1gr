#Vārdnīcas definēšana
data = {}

# Pievienojam rezultātus
while True:
    # Ievadām vārdu, svaru un augumu
    vards = input("Ievadiet vārdu: ")
    klikski = int(input("Ievadiet {} kliksku sk: ".format(vards)))
    laiks = int(input("Ievadiet {} laiku: ".format(vards)))
    
    # Saglabājam datus vārdnīcā
    data[vards] = {'klikski': klikski, 'laiks': laiks}
    
    # Vai pievienot vēl vienu personu
    atk = input("Vai vēlaties pievienot vēl vienu personu? (j/n): ").strip().lower()
    if atk != 'j':
        break

# Ierakstām vārdnīcu failā
with open('klikski.txt', 'a', encoding='utf-8') as file:
    for vards, info in data.items():
        file.write("{}: {}, {}\n".format(vards, info['klikski'], info['laiks']))

print("Dati ir saglabāti failā.")
