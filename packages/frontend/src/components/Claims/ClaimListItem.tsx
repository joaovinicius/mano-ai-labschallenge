import { Card } from '@mantine/core';

type ClaimListItemProps = {
  userId: string,
  claimId: string,
  createdAt: string,
  onClick: () => void
}

export function ClaimListItem({
  userId,
  claimId,
  createdAt,
  onClick,
}: ClaimListItemProps) {
  return (
    <Card className='cursor-pointer' shadow="sm" padding="lg" radius="md" withBorder onClick={onClick}>
      <dl className="divide-y divide-gray-100">
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm/6 font-medium text-gray-900">User ID</dt>
          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{userId}</dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm/6 font-medium text-gray-900">Claim ID</dt>
          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{claimId}</dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm/6 font-medium text-gray-900">Created</dt>
          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{createdAt}</dd>
        </div>
      </dl>
    </Card>
  );
}
