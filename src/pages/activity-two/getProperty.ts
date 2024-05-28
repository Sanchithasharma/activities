export const getProperty = (path: string, obj: any) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };