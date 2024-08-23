// Machine-Learning-through-Google-Earth-Engine
// Land Cover Classification using Sentinel-2 Imagery

// This project uses Google Earth Engine to perform land cover classification on Sentinel-2 imagery for the year 2023.

// Steps:
// 1. Load Sentinel-2 image collection and preprocess the data.
// 2. Merge and sample training data for different land cover classes.
// 3. Train a Random Forest classifier on the sampled data.
// 4. Classify the image and display the results.
// 5. Evaluate the classifier performance using confusion matrices and accuracy.
// 6. Export the training data for further analysis.

// Loading and Preprocessing the Sentinel-2 Image Collection

// Loading Sentinel-2 Imagery
var image = imageCollection.filterDate('2023-01-01', '2023-12-31').filterBounds(ddn).median();
// The script loads Sentinel-2 images from the year 2023 over a specific region (ddn). 
// The median() function is used to reduce the image collection to a single image, 
// which represents the median pixel value across the year.

// Selecting Bands and Adding Spectral Indices
var bands = ['B2', 'B3', 'B4', 'B8'];
var image = image.select(bands).addBands(image.normalizedDifference(['B8', 'B4']).rename('NDVI'));
// The code selects specific bands (B2, B3, B4, and B8) and adds the Normalized Difference Vegetation Index (NDVI) as an additional band. 
// NDVI is computed using the near-infrared (B8) and red (B4) bands.

// Display Parameters
var displayparameters = { min: 1000, max: 4500, bands: ['B8', 'B4', 'B3'] };
Map.addLayer(image, displayparameters, "Image");
// The image is displayed on the map using the specified bands (B8, B4, B3) and display parameters.

// Loading Training Data
var label = "Class";
var training = Water.merge(Forest).merge(Urban);
// The script combines different land cover classes (Water, Forest, Urban) into a single training dataset and assigns them a label "Class".

// Extracting Features for Training
// Sampling Training Data
var trainingimage = image.sampleRegions({
  collection: training,
  properties: [label],
  scale: 10
});
// Features are extracted from the image for each training region. The sampling is done at a 10-meter scale.

// Splitting Data into Training and Testing Sets
// Randomly Splitting Data
var traingData = trainingimage.randomColumn();
var trainSet = traingData.filter(ee.Filter.lessThan('random',0.8'));
var testSet = traingData.filter(ee.Filter.greaterThanOrEquals('random',0.8'));
// The data is split into training (80%) and testing (20%) sets using a random column.

// Training the Random Forest Classifier
// Training the Classifier
var classifier = ee.Classifier.smileRandomForest({numberOfTrees:100, variablesPerSplit: 2, minLeafPopulation: 1, bagFraction: 0.5, seed: 0});
var classifier = ee.Classifier.smileRandomForest(100).train(trainSet, label, bands);
// The script trains a Random Forest classifier using the training set. The classifier uses 100 trees and the specified parameters

// Classifying the Image
// Applying the Classifier
var classified = image.classify(classifier);
// The trained classifier is used to classify the entire image or region of interest.

// Displaying the Classified Image
Map.centerObject(ddn, 10);
Map.addLayer(classified, {min: 1, max: 3, palette: ['green', 'blue', 'red']}, 'LandCover');
// The classified image is displayed with a color palette representing different land cover classes.

// Evaluating the Classifier
// Training Accuracy
var trainAccuracy = classifier.confusionMatrix();
print('Training error matrix', trainAccuracy);
print('Training overall accuracy', trainAccuracy.accuracy());
// The confusion matrix and accuracy for the training set are printed.

// Validation Accuracy
testSet = testSet.classify(classifier);
var validationAccuracy = testSet.errorMatrix(label, 'classification');
print('Validation error matrix', validationAccuracy);
print('Validation accuracy', validationAccuracy.accuracy());
// The script evaluates the classifier's performance on the test set and prints the validation confusion matrix and accuracy.

// Exporting Data
// Exporting to Google Earth Engine Asset
Export.table.toAsset({
  collection: training,
  description: 'LCsample2023',
  assetId: 'LCsample2023'
});
// The training data is also exported to Google Drive in SHP format.
