import torch

# Model
# model = torch.load("best.pt")  # or yolov5n - yolov5x6, custom
model = torch.hub.load('ultralytics/yolov5', 'custom', path='best.pt')

# Images
img = "../yolov5/inference_picar.jpg"  # or file, Path, PIL, OpenCV, numpy, list

# Inference
results = model(img)

# Results
# results.print()  # or .show(), .save(), .crop(), .pandas(), etc.
# results.show()
# results.crop()

print(results)
boxes = list(results.pandas().xyxy[0].values[0])
print(boxes)