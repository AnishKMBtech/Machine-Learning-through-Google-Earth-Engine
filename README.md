# Machine-Learning-through-Google-Earth-Engine
# Land Cover Classification using Sentinel-2 Imagery

This project uses Google Earth Engine to perform land cover classification on Sentinel-2 imagery for the year 2023.

## Steps:
1. Load Sentinel-2 image collection and preprocess the data.
2. Merge and sample training data for different land cover classes.
3. Train a Random Forest classifier on the sampled data.
4. Classify the image and display the results.
5. Evaluate the classifier performance using confusion matrices and accuracy.
6. Export the training data for further analysis.

## How to Use
- Open the script in Google Earth Engine.
- Modify the region of interest (`ddn`) as needed.
- Run the script to classify land cover and export the results.

## Outputs
- Land cover classification map.
- Training and validation accuracy metrics.
- Exported training data in SHP format.
