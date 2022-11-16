import React from 'react';
import { useNumberControl } from '../../main';
import { Pagination } from '@mantine/core';

interface IPaginationStoryProps {}

export const PaginationStory: React.FC<IPaginationStoryProps> = () => {
  const [totalValue] = useNumberControl({
    defaultValue: 10,
    name: 'Total',
    min: 5,
    max: 20,
  });

  const [siblingsValue] = useNumberControl({
    defaultValue: 2,
    name: 'Siblings',
    min: 1,
    max: totalValue / 2 - 1,
  });

  const [initialValue] = useNumberControl({
    defaultValue: 3,
    name: 'Initial page',
    min: 1,
    max: totalValue,
  });

  return (
    <div>
      <Pagination siblings={siblingsValue} total={totalValue} page={initialValue} />
    </div>
  );
};
