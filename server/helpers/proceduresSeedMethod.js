import Procedure from '../models/Procedure';

export const seedProcedures = async () => {
  const procedures = ['urology', 'cardiology', 'dentist'];
  for (const proc of procedures) {
    const procedureExist = await Procedure.findOne({ name: proc });
    if (!procedureExist) {
      const procedure = new Procedure({
        createdUser: 'data seed',
        createdDate: new Date(),
        name: proc
      });
      await procedure.save();
    }
  }
};
