import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { Subject } from './subject';

//Use controls from context
export const useSubjectValue = <T>(subject: Subject<T>): T => {
  const [state, setState] = useState(subject.getState);
  useEffect(() => subject.subscribe(setState), []);
  return state;
};

//Initialize controls
export const useCreateSubject = <T>(initial: T): [Subject<T>, Dispatch<SetStateAction<T>>] => {
  const [subject] = useState(() => new Subject(initial));
  const setSubjectValue = useCallback((callback: SetStateAction<any>) => {
    subject.next(callback(subject.getState()));
  }, []);
  return [subject, setSubjectValue];
};
