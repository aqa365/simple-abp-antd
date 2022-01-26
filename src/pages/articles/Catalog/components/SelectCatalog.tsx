import React from 'react';
import { ProFormTreeSelect } from '@ant-design/pro-form';
import { getCatalogAll } from '@/services/simple-abp/articles/catalog-service';
import { convertToArticleCatalogTreeSelect } from '@/utils/tree';

export type SelectCatalogProps = {
  params: {
    disabledId?: string;
    name?: string;
  };
};

const SelectCatalog: React.FC<SelectCatalogProps> = (props) => {
  const params = props.params;

  return (
    <ProFormTreeSelect
      name={params.name}
      placeholder="Please select"
      allowClear
      secondary
      request={async () => {
        const catatlogAll = await getCatalogAll();
        const treeData = convertToArticleCatalogTreeSelect(null, catatlogAll, params.disabledId);
        return treeData;
      }}
      fieldProps={{
        showArrow: false,
        dropdownMatchSelectWidth: false,
        treeDefaultExpandAll: true,
        treeLine: { showLeafIcon: false },
        labelInValue: true,
        fieldNames: {
          value: 'value',
        },
      }}
    />
  );
};

export default SelectCatalog;
