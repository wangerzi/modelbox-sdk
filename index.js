import OSS from 'ali-oss'

async function getShareDetail(code) {
  return get(`${API_URL}/model/ModelApi/shareDetail?code=${code}`);
}
