import {
  medSAMActionDto,
  monaiActionDto,
} from "@/validators/annotationValidator";

export const medSAMActionService = async (data: medSAMActionDto) => {
  const { dicomId, sliceIndex, coordinates } = data;

  //call annotation server and return result
};

export const monaiActionService = async (data: monaiActionDto) => {
  const { dicomId, sliceIndex } = data;

  //call annotation server and return result
};
