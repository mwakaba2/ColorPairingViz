import pandas as pd


df = pd.read_csv('./objects.csv')
dictionary = dict(df.medium.value_counts()[:60])
medium = list(dictionary.keys())
print medium
# mediums with at least 150 objects

periods = df.period_id.value_counts()
# 35417101    1183
# 35417175    1088
# 35417089     927
# 35435409     537
# 35417049     329
# 35417235     300
# 35417081     167
# 35435429     159
# 35417141     119
# 35417075     101

period_dict = {'Rococo': 35417101, 'Hudson River School': 35417175, 'Neoclassical': 35417089,
				'American Modern': 35435409, 'early Modern': 35417049, 'Art Deco': 35417235, 
				'Baroque': 35417081, 'postwar': 35435429, '	Civil War': 35417141, 
				'Northern Renaissance': 35417075, 'Mid-20th century': 35417329, 
				'Late Nineteenth Century': 35417087, '	Late Twentieth Century': 35435423,
				'Early 20th century': 35417121}