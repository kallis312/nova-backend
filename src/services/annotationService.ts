import {
  medSAMActionDto,
  monaiActionDto,
} from "@/validators/annotationValidator";
import { annotationServer } from "@/config/axiosConfig";

export const medSAMActionService = async (data: medSAMActionDto) => {
  const { dicomId, sliceIndex, coordinates } = data;

  //TODO get dicom information from Jupiter server to pass into API body

  //call mock annotation server
  const body = {
    DataType: "image",
    S3URI: "s3://bucket-name/path/to/data",
    Model: "MedSAM",
    Task: null,
    BBox: [473.07, 395.93, 38.65, 28.67],
  };
  const response = await annotationServer.post("/online", body);

  return response.data;
};

export const monaiActionService = async (data: monaiActionDto) => {
  const { dicomId, sliceIndex } = data;

  //TODO get dicom information from Jupiter server to pass into API body

  //call mock annotation server
  const body = {
    DataType: "series",
    S3URI: "s3://bucket-name/path/to/data",
    Model: "nnU-Net",
    Task: null,
    BBox: null,
  };
  const response = await annotationServer.post("/batch", body);

  return response.data;
};
