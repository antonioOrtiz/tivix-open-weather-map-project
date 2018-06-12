export default function dataTracker(min, max, mean, mode) {
  this.value = {};
  this.min = min;
  this.max = max;
  this.mean = mean;
  this.mode = mode;
}

dataTracker.prototype.insert = function(obj) {
  this.value = obj;
  return this.value;
};

dataTracker.prototype.showMin = function() {
  return `Minimum temperature: ${Math.floor(this.min)}°`;
};

dataTracker.prototype.showMax = function() {
  return `Maximum temperature: ${Math.ceil(this.max)}°`;
};

dataTracker.prototype.showMean = function() {
  return `Mean temperature: ${this.mean}°`;
};

dataTracker.prototype.showMode = function(mode) {
  return `Mode: ${this.mode}`;
};
