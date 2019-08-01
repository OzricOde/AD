# imports to run ml libraries
import pandas as pd  
import numpy as np  
import matplotlib.pyplot as plt 
import pickle 
from datetime import datetime
# %matplotlib inline

# read csv file for dataset

names = ['fax','fay','faz','fgx','fgy','fgz','fhrate','foq','fox','foy','foz','label']

data = pd.read_csv('./normalized.csv', names = names)
# shows first few elements in dataset
x = data.head()
print(x)
#split labels and attributes
X = data.drop('label', axis=1)  
y = data['label']  

#split X, Y into training and test datasets
from sklearn.model_selection import train_test_split  
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.20)  

#train svm, svclassfier stores the trained modal
start = datetime.now()
print("started training model")
from sklearn.svm import SVC 
svr = SVC(kernel='rbf', gamma='scale', verbose=1, probability=True)
print("classifier created")  
svr.fit(X_train, y_train)
end = datetime.now()
print("model trained")

#make predictions
y_pred = svr.predict(X_test) 

#get metric for the modal
from sklearn.metrics import classification_report, confusion_matrix  
print("Confusion Matrix is\n",confusion_matrix(y_test,y_pred))  
print("Precision, recall and f1 score of the model is")
print(classification_report(y_test,y_pred)) 

print("saving models")
filename = 'finalizedModel.sav'
pickle.dump(svr, open(filename, 'wb'))