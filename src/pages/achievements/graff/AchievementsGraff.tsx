import React, { FC } from 'react';

import { Card } from 'antd';
import dayjs from 'dayjs';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { Formats, InterfaceLabels } from '@/constants';

import { Achievement } from '@/dto/achievements/Achievement';

interface AchievementsGraffProps {
  achievements: Achievement[];
}

export const AchievementsGraff: FC<AchievementsGraffProps> = ({ achievements }) => {
  return (
    <div>
      {achievements && achievements.length ? (
        <Card style={{ marginTop: 24 }} title={InterfaceLabels.AP_GRAFF_TITLE}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={[...achievements].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => [`${value} ${InterfaceLabels.KCAL}`, InterfaceLabels.AP_GRAFF_CALORIES]}
                labelFormatter={(label: string) =>
                  `${InterfaceLabels.AP_GRAFF_DATE}: ${dayjs(label).format(Formats.DATE_VIEW)}`
                }
              />
              <Line type="monotone" dataKey="calories" stroke="#1890ff" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      ) : null}
    </div>
  );
};
