# Land Cover Classification using Sentinel-2 Imagery
by Anish K M
## Project Overview

This project leverages Google Earth Engine to perform land cover classification on Sentinel-2 imagery for the year 2023. After participating in the IIRS Machine Learning program's session on "Machine Learning through Google Earth Engine," I was inspired to apply my new knowledge to a practical task. The hands-on experience with GEE allowed me to see how machine learning techniques can be applied to large-scale environmental data to uncover meaningful patterns.

## Steps

1. **Load Sentinel-2 Image Collection**: Begin by loading and preprocessing the Sentinel-2 imagery to remove clouds and shadows, ensuring clean data for accurate analysis.
2. **Merge and Sample Training Data**: Collect and merge samples for various land cover classes to create a robust training dataset.
3. **Train a Random Forest Classifier**: Use the sampled training data to train a Random Forest classifier, which will learn to distinguish between different land cover types.
4. **Classify the Image**: Apply the trained classifier to the entire Sentinel-2 image to categorize each pixel according to the identified land cover classes.
5. **Evaluate Classifier Performance**: Assess the accuracy of the classification using confusion matrices and other performance metrics to ensure the classifier's reliability.
6. **Export Training Data**: Export the training data in SHP format for further analysis and validation.

## How to Use

- Open the provided script in Google Earth Engine.
- Adjust the region of interest (`ddn`) to focus on the area of interest.
- Execute the script to perform land cover classification and export the results.

## Outputs

- **Land Cover Classification Map**: A visual map showing the classified land cover types across the studied area.
- **Training and Validation Accuracy Metrics**: Metrics indicating the performance of the classifier in terms of accuracy and reliability.
- **Exported Training Data**: Training data available in SHP format for additional analysis.

## Band Numbers

The Sentinel-2 MSI dataset includes several spectral bands, each suited for different types of analysis:

- **Band 2 (Blue)**: Useful for analyzing water bodies.
- **Band 3 (Green)**: Helps in assessing vegetation health.
- **Band 4 (Red)**: Crucial for distinguishing vegetation.
- **Band 8 (NIR)**: Important for analyzing biomass and vegetation.
- **Band 11 (SWIR)**: Useful for studying soil and moisture content.

## Project Insights

Working on this project provided me with valuable insights into how various land cover types can be identified and classified using satellite imagery. The ability to transform raw satellite data into actionable insights was incredibly motivating and has deepened my interest in machine learning applications in environmental analysis.

## Note

This project represents my initial exploration into applying machine learning techniques to real-world satellite data. It reflects my current understanding and is part of my ongoing learning journey.
The accuracy will be low since the project is just a prototype

## Links

- [Project Code on Google Earth Engine](#)
- https://code.earthengine.google.com/838e58fd582be6788d944cf9bf872f35


- [Dataset Information: Sentinel-2 MSI Dataset](#)
- https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_S2_SR_HARMONIZED

Please refer to the release section for a detailed explanation and the source code.
