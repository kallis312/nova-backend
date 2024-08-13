import prisma from "@/config/dbConfig";
import { reviewDicomDto } from "@/validators/dicomValidator";
import { EDicomStatus } from "@prisma/client";

export const reviewDicomService = async (
  dicomId: string,
  data: reviewDicomDto
) => {
  const { status } = data;

  const dicom = await prisma.dicom.findUnique({
    where: { id: dicomId },
  });

  if (!dicom) throw new Error("Not found dicom");
  if (dicom.status === EDicomStatus.unannotated)
    throw new Error("Dicom not annotated yet");

  const dicomUpdated = await prisma.dicom.update({
    where: { id: dicomId },
    data: { status },
  });

  return dicomUpdated;
};
