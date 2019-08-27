import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import { MdAddAPhoto } from 'react-icons/md';
import api from '~/services/api';

import { Container } from './styles';

export default function BannerInput() {
  const { defaultValue, registerField } = useField('banner');

  const [preview, setPreview] = useState(defaultValue && defaultValue.url);
  const [file, setFile] = useState(defaultValue && defaultValue.id);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'banner_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);
    data.append('type', 'banner');

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }
  return (
    <Container>
      <label htmlFor="banner">
        {preview && <img src={preview} alt="banner_meetapp" />}

        {!preview && (
          <div className="icon-add">
            <MdAddAPhoto size={48} color="rgba(255, 255, 255, .7)" />
          </div>
        )}
        <input
          type="file"
          id="banner"
          accept="image/*"
          onChange={handleChange}
          data-file={file}
          ref={ref}
        />
      </label>
    </Container>
  );
}
