-- Seed de empresas de assinatura populares
-- Usando gen_random_uuid() para gerar UUIDs válidos
INSERT INTO subscription_companies (id, name, category, logo, website, description, is_active, created_at, updated_at)
VALUES
  -- Streaming de Vídeo
  (gen_random_uuid(), 'Netflix', 'streaming', 'https://cdn.worldvectorlogo.com/logos/netflix-3.svg', 'https://www.netflix.com', 'Streaming de filmes e séries', true, NOW(), NOW()),
  (gen_random_uuid(), 'Amazon Prime Video', 'streaming', 'https://cdn.worldvectorlogo.com/logos/amazon-prime-video-1.svg', 'https://www.primevideo.com', 'Streaming de vídeo Amazon', true, NOW(), NOW()),
  (gen_random_uuid(), 'Disney+', 'streaming', 'https://cdn.worldvectorlogo.com/logos/disney-plus.svg', 'https://www.disneyplus.com', 'Streaming Disney, Pixar, Marvel, Star Wars', true, NOW(), NOW()),
  (gen_random_uuid(), 'HBO Max', 'streaming', 'https://cdn.worldvectorlogo.com/logos/hbo-max.svg', 'https://www.hbomax.com', 'Streaming HBO e Warner Bros', true, NOW(), NOW()),
  (gen_random_uuid(), 'Globoplay', 'streaming', 'https://s3.glbimg.com/v1/AUTH_b3309463db95468aa275bd532137e960/public/img/logo-globoplay.svg', 'https://globoplay.globo.com', 'Streaming de conteúdo brasileiro', true, NOW(), NOW()),
  (gen_random_uuid(), 'YouTube Premium', 'streaming', 'https://cdn.worldvectorlogo.com/logos/youtube-icon.svg', 'https://www.youtube.com/premium', 'YouTube sem anúncios + YouTube Music', true, NOW(), NOW()),
  (gen_random_uuid(), 'Paramount+', 'streaming', 'https://cdn.worldvectorlogo.com/logos/paramount-plus.svg', 'https://www.paramountplus.com', 'Streaming Paramount e CBS', true, NOW(), NOW()),
  (gen_random_uuid(), 'Apple TV+', 'streaming', 'https://cdn.worldvectorlogo.com/logos/apple-tv.svg', 'https://tv.apple.com', 'Streaming de produções Apple', true, NOW(), NOW()),
  
  -- Streaming de Música
  (gen_random_uuid(), 'Spotify', 'music', 'https://cdn.worldvectorlogo.com/logos/spotify-2.svg', 'https://www.spotify.com', 'Streaming de música e podcasts', true, NOW(), NOW()),
  (gen_random_uuid(), 'Apple Music', 'music', 'https://cdn.worldvectorlogo.com/logos/apple-music-1.svg', 'https://music.apple.com', 'Streaming de música Apple', true, NOW(), NOW()),
  (gen_random_uuid(), 'Deezer', 'music', 'https://cdn.worldvectorlogo.com/logos/deezer-2.svg', 'https://www.deezer.com', 'Streaming de música', true, NOW(), NOW()),
  (gen_random_uuid(), 'YouTube Music', 'music', 'https://cdn.worldvectorlogo.com/logos/youtube-icon.svg', 'https://music.youtube.com', 'Streaming de música do YouTube', true, NOW(), NOW()),
  (gen_random_uuid(), 'Tidal', 'music', 'https://cdn.worldvectorlogo.com/logos/tidal.svg', 'https://tidal.com', 'Streaming de música alta qualidade', true, NOW(), NOW()),
  
  -- Cloud Storage
  (gen_random_uuid(), 'Google Drive', 'cloud', 'https://cdn.worldvectorlogo.com/logos/google-drive.svg', 'https://drive.google.com', 'Armazenamento em nuvem Google', true, NOW(), NOW()),
  (gen_random_uuid(), 'Dropbox', 'cloud', 'https://cdn.worldvectorlogo.com/logos/dropbox-1.svg', 'https://www.dropbox.com', 'Armazenamento e sincronização de arquivos', true, NOW(), NOW()),
  (gen_random_uuid(), 'OneDrive', 'cloud', 'https://cdn.worldvectorlogo.com/logos/onedrive-1.svg', 'https://onedrive.live.com', 'Armazenamento em nuvem Microsoft', true, NOW(), NOW()),
  (gen_random_uuid(), 'iCloud+', 'cloud', 'https://cdn.worldvectorlogo.com/logos/icloud-1.svg', 'https://www.icloud.com', 'Armazenamento em nuvem Apple', true, NOW(), NOW()),
  
  -- Software e Produtividade
  (gen_random_uuid(), 'Microsoft 365', 'software', 'https://cdn.worldvectorlogo.com/logos/microsoft-office-2013.svg', 'https://www.microsoft.com/microsoft-365', 'Suite de produtividade Microsoft', true, NOW(), NOW()),
  (gen_random_uuid(), 'Adobe Creative Cloud', 'software', 'https://cdn.worldvectorlogo.com/logos/adobe-cc-0.svg', 'https://www.adobe.com/creativecloud', 'Ferramentas criativas Adobe', true, NOW(), NOW()),
  (gen_random_uuid(), 'Notion', 'software', 'https://cdn.worldvectorlogo.com/logos/notion-2.svg', 'https://www.notion.so', 'Workspace all-in-one', true, NOW(), NOW()),
  (gen_random_uuid(), 'Canva Pro', 'software', 'https://cdn.worldvectorlogo.com/logos/canva-1.svg', 'https://www.canva.com', 'Design gráfico online', true, NOW(), NOW()),
  (gen_random_uuid(), 'GitHub', 'software', 'https://cdn.worldvectorlogo.com/logos/github-icon.svg', 'https://github.com', 'Plataforma de desenvolvimento', true, NOW(), NOW()),
  
  -- Gaming
  (gen_random_uuid(), 'PlayStation Plus', 'gaming', 'https://cdn.worldvectorlogo.com/logos/playstation-2.svg', 'https://www.playstation.com/ps-plus', 'Serviço de assinatura PlayStation', true, NOW(), NOW()),
  (gen_random_uuid(), 'Xbox Game Pass', 'gaming', 'https://cdn.worldvectorlogo.com/logos/xbox-2.svg', 'https://www.xbox.com/xbox-game-pass', 'Biblioteca de jogos Xbox', true, NOW(), NOW()),
  (gen_random_uuid(), 'Nintendo Switch Online', 'gaming', 'https://cdn.worldvectorlogo.com/logos/nintendo-2.svg', 'https://www.nintendo.com/switch/online', 'Serviço online Nintendo', true, NOW(), NOW()),
  (gen_random_uuid(), 'Steam', 'gaming', 'https://cdn.worldvectorlogo.com/logos/steam.svg', 'https://store.steampowered.com', 'Plataforma de jogos PC', true, NOW(), NOW()),
  
  -- Fitness e Saúde
  (gen_random_uuid(), 'Gympass', 'fitness', null, 'https://www.gympass.com', 'Rede de academias e bem-estar', true, NOW(), NOW()),
  (gen_random_uuid(), 'TotalPass', 'fitness', null, 'https://www.totalpass.com.br', 'Rede de academias', true, NOW(), NOW()),
  
  -- Delivery
  (gen_random_uuid(), 'iFood', 'delivery', null, 'https://www.ifood.com.br', 'Delivery de comida', true, NOW(), NOW()),
  (gen_random_uuid(), 'Rappi', 'delivery', null, 'https://www.rappi.com.br', 'Delivery de supermercado e comida', true, NOW(), NOW()),
  
  -- Outros
  (gen_random_uuid(), 'LinkedIn Premium', 'other', 'https://cdn.worldvectorlogo.com/logos/linkedin-icon-2.svg', 'https://www.linkedin.com/premium', 'Rede profissional premium', true, NOW(), NOW()),
  (gen_random_uuid(), 'Medium', 'other', 'https://cdn.worldvectorlogo.com/logos/medium-1.svg', 'https://medium.com', 'Plataforma de publicação', true, NOW(), NOW()),
  (gen_random_uuid(), 'Audible', 'other', 'https://cdn.worldvectorlogo.com/logos/audible-1.svg', 'https://www.audible.com', 'Audiolivros Amazon', true, NOW(), NOW())
ON CONFLICT (name) DO NOTHING;
