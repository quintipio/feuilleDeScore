export interface User {
  id: number;
  name: string;
}

export function isUser(object: any): object is User {
  return (
    typeof object === 'object' &&
    object !== null &&
    'name' in object &&
    'id' in object
  )
}
