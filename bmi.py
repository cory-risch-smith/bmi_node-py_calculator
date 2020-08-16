import sys

def bmi_calc(weight, height):
    weight = float(weight)
    height = float(height)
    bmi = (weight / (height ** 2)) * 703
    bmi = round (bmi, 2)
    return bmi

bmi = bmi_calc(sys.argv[1], sys.argv[2])
print(bmi)
