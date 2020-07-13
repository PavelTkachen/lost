from lost.pyapi import script
import os
import pandas as pd
import json

ENVS = ['lost']
ARGUMENTS = {'file_name': {'value': 'annos.csv',
                           'help': 'Name of the file with exported bbox annotations.'}
             }


class ExportCsv(script.Script):
    '''This Script creates a csv file from image annotations and adds a data_export
    to the output of this script in pipeline.
    '''

    def main(self):
        df = self.inp.to_df()
        labels = ['img.img_path', 'img.anno_task_id', 'img.lbl.name']
        filtered_df = df.filter(
            items=['img.img_path', 'img.anno_task_id', 'img.lbl.name'])
        imgs = filtered_df['img.img_path'].values
        idxs = filtered_df['img.anno_task_id'].values
        names = filtered_df['img.lbl.name'].values

        a_dict = {}
        result = {}
        for i, ind, n in zip(imgs, idxs, names):
            n = json.loads(n)[0].strip()
            if i in a_dict.keys():
                a_dict[i][ind] = n
            else:
                a_dict[i] = {ind: n}


        for key in a_dict:
            if not 'img.img_path' in result.keys():
                result['img.img_path'] = []
            result['img.img_path'].append(key)
            for i in a_dict[key]:
                if not i in result.keys():
                    result[i] = []
                result[i].append(a_dict[key][i])
        d = pd.DataFrame(data=result)
        csv_path = self.get_path(self.get_arg('file_name'), context='instance')
        d.to_csv(path_or_buf=csv_path,
                  sep=',',
                  header=True,
                  index=False)
        self.outp.add_data_export(file_path=csv_path)
        self.logger.info('Stored export to: {}'.format(csv_path))

if __name__ == "__main__":
    my_script = ExportCsv()
