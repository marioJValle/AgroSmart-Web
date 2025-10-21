export class MMLStats {
  constructor({ 
    id = null, 
    averageResponseTime, 
    accuracy, 
    successRate, 
    failureRate, 
    averageConfidence, 
    intents,
    ramUsage,
    hourlyUsage,
    dailyUsage
  }) {
    this.id = id;
    this.averageResponseTime = averageResponseTime; // in milliseconds
    this.accuracy = accuracy; // percentage
    this.successRate = successRate; // percentage
    this.failureRate = failureRate; // percentage
    this.averageConfidence = averageConfidence; // percentage
    this.intents = intents; // object like { intentName: count }
    this.ramUsage = ramUsage; // object { current, max, unit }
    this.hourlyUsage = hourlyUsage; // array of 24 numbers
    this.dailyUsage = dailyUsage; // object { dayName: count }
  }

  static fromFirebase(doc) {
    const data = doc.data();
    return new MMLStats({
      id: doc.id,
      averageResponseTime: data.averageResponseTime,
      accuracy: data.accuracy,
      successRate: data.successRate,
      failureRate: data.failureRate,
      averageConfidence: data.averageConfidence,
      intents: data.intents,
      ramUsage: data.ramUsage,
      hourlyUsage: data.hourlyUsage,
      dailyUsage: data.dailyUsage,
    });
  }
}
