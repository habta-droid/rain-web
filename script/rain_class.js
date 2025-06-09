
class RainPredictor {
  constructor() {
    this._medianETA = null;
  }

  update(data) {
    // 1. Compute heuristic scores for each factor
    const cloudsScore = data.clouds_all * 0.4; // weight cloudiness (0–100)
    const humidityScore = data.humidity * 0.3; // weight humidity (0–100)
    // Pressure factor: low pressure => higher score
    const pressureDelta = Math.max(0, 1010 - data.pressure);
    const pressureScore = pressureDelta * 0.2; // mb below ~1010 add to score
    // Wind factor (optional): more wind could indicate storm
    const windScore = data.wind_speed * 0.1;
    // Temperature drop (optional): larger drop could signal front
    const tempDrop = data.temp_max - data.temp;
    const tempScore = tempDrop > 5 ? tempDrop * 0.1 : 0;

    // 2. Sum scores
    let score =
      cloudsScore + humidityScore + pressureScore + windScore + tempScore;

    // 3. Normalize to confidence (0–1)
    let confidence = score / 50.0; // divisor tunes overall scaling
    if (confidence > 1) confidence = 1;

    // 4. Determine ETA range by confidence (higher => sooner)
    let rangeLabel, median;
    if (confidence >= 0.9) {
      rangeLabel = "0–10 minutes";
      median = 5;
    } else if (confidence >= 0.8) {
      rangeLabel = "10–20 minutes";
      median = 15;
    } else if (confidence >= 0.7) {
      rangeLabel = "20–30 minutes";
      median = 25;
    } else if (confidence >= 0.6) {
      rangeLabel = "30–40 minutes";
      median = 35;
    } else if (confidence >= 0.5) {
      rangeLabel = "40–50 minutes";
      median = 45;
    } else if (confidence >= 0.4) {
      rangeLabel = "50–60 minutes";
      median = 55;
    } else if (confidence >= 0.3) {
      rangeLabel = "60–70 minutes";
      median = 65;
    } else if (confidence >= 0.2) {
      rangeLabel = "70–80 minutes";
      median = 75;
    } else if (confidence >= 0.1) {
      rangeLabel = "80–90 minutes";
      median = 85;
    } else if (confidence > 0) {
      rangeLabel = "90–120 minutes";
      median = 105;
    } else {
      // Very low score: beyond 2 hours
      rangeLabel = "2–3 hours";
      median = 150;
      if (confidence <= 0.02) {
        rangeLabel = "3+ hours";
        median = 210;
      }
    }

    // Store median and return prediction
    this._medianETA = median;
    return { range: rangeLabel, confidence: confidence };
  }

  getMedianETA() {
    return this._medianETA;
  }
}

class Schedule {
  constructor(action, time) {
    this.list_map = new Map();
    this.list_map.set(action, time);
  }

  add(new_action, new_time) {
    this.list_map.set(new_action, new_time);
  }

  remove(removed_action) {
    this.list_map.delete(removed_action);
  }

  view() {
    for (const [key, value] of this.list_map) {
      console.log(`${key}: ${value}`);
    }
  }
}


export { Schedule, RainPredictor };