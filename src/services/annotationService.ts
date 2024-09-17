import {
  medSAMActionDto,
  monaiActionDto,
} from "@/validators/annotationValidator";
import { annotationServer } from "@/config/axiosConfig";

export const medSAMActionService = async (data: medSAMActionDto) => {
  const { dicomId, sliceIndex, coordinates, dataType } = data;

  //call mock annotation server
  const body = {
    dicomId,
    sliceIndex,
    DataType: dataType,
    Model: "MedSAM",
    Task: null,
    BBox: coordinates,
  };
  const response = await annotationServer.post("/online", body);

  return response.data;
};

export const monaiActionService = async (data: monaiActionDto) => {
  const { dicomId, sliceIndex, dataType } = data;

  //call mock annotation server
  const body = {
    dicomId,
    sliceIndex,
    DataType: dataType,
    Model: "nnU-Net",
    Task: null,
    BBox: null,
  };
  const response = await annotationServer.post("/batch", body);

  return response.data;
};
