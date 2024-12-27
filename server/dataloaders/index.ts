import { PrismaClient } from '@prisma/client';
import createIsAppliedForJobDataloader from './isAppliedForJobDataloader';
import { isArgumentsObject } from 'util/types';

export interface IDataloaderArgs {
  prisma: PrismaClient;
  userId?: string;
}

const createDataloaders = (args: IDataloaderArgs) => {
  return {
    isAppliedForJob: createIsAppliedForJobDataloader(args)
  };
}

export default createDataloaders;