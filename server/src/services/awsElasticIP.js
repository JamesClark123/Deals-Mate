import aws from "aws-sdk";

import singleton from "../decorators/singleton";

aws.config.update({ region: "us-west-2" });

const params = {
  EnvironmentNames: ["Dealsmate-env"],
};

const eb = new aws.ElasticBeanstalk();

@singleton
class AWSElasticIP {
  promiseToURL = null;

  constructor() {
    if (process.env.NODE_ENV === "development") {
      this.promiseToURL = Promise.resolve("http://localhost:3000/");
    } else {
      async function fetchURL() {
        const data = await eb.describeEnvironments(params).promise();
        console.log(data);
        return data.Environments[0].EndpointUrl + "/";
      }
      this.promiseToURL = fetchURL();
    }
  }

  async getURL() {
    return this.promiseToURL;
  }
}

export default AWSElasticIP;
