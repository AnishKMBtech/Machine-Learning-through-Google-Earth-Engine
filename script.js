// Release by Anish K M
// Load Sentinel-2 image collection.
var image = imageCollection.filterDate('2023-01-01', '2023-12-31').filterBounds(ddn).median();
// Define a region of interest.
// Select bands and create an image with spectral indices.
var bands = ['B2', 'B3', 'B4', 'B8'];
var image = image.select(bands).addBands(image.normalizedDifference(['B8',
'B4']).rename('NDVI'));
var displayparameters = {
min: 1000,
max: 4500,
bands: ['B8', 'B4', 'B3'],
};
Map.addLayer(image,displayparameters,"Image");
// Load training data (e.g., land cover classes).
var label = "Class";
var training = Water.merge(Forest).merge(Urban);
// Extract features for training.
var trainingimage = image.sampleRegions({
collection: training,
properties: [label],
scale: 10
})
// Divide input samples into Training & Testing
var traingData = trainingimage.randomColumn();
var trainSet = traingData.filter(ee.Filter.lessThan('random',0.8));
var testSet = traingData.filter(ee.Filter.greaterThanOrEquals('random',0.8));
// Train a Random Forest classifier.
//Define the classifier parameters:
var classifier = ee.Classifier.smileRandomForest({numberOfTrees:100, variablesPerSplit: 2,
minLeafPopulation: 1, bagFraction: 0.5,
seed: 0});
//Train the classifier on the training dataset
var classifier = ee.Classifier.smileRandomForest(100).train(trainSet, label, bands);
// Classify the image
// Use the trained classifier to classify the entire dataset or the ROI
var classified = image.classify(classifier);
// Display the results.
Map.centerObject(ddn, 10);
Map.addLayer(classified, {min: 1, max: 3, palette: ['green', 'blue', 'red']}, 'LandCover');
//Get information about the trained classifier
print('Results of trained classifier', classifier.explain());
//Get a confusion matrix and overall accuracy for the training sample
var trainAccuracy = classifier.confusionMatrix();
print('Training error matrix', trainAccuracy);
print('Training overall accuracy', trainAccuracy.accuracy());
//Get a confusion matrix and overall accuracy for the validation sample.
testSet = testSet.classify(classifier);
var validationAccuracy = testSet.errorMatrix(label,'classification');
print('Validation error matrix', validationAccuracy);
print('Validation accuracy', validationAccuracy.accuracy());
Export.table.toAsset({
collection: training,
description: 'LCsample2023',
assetId: 'LCsample2023'
});
Export.table.toDrive({
collection: training,
description: 'LCsample2023',
fileFormat: 'SHP'
});
