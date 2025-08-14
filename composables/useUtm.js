export const useUtm = () => {
  const utmParameters = [
    'utm_campaign',
    'utm_source',
    'utm_medium',
    'utm_content',
    'utm_term',
  ];

  const route = useRoute();

  const hasUtmParameters = computed(() => {
    const queryKeys = Object.keys(route.query);

    if (!queryKeys.length) return false;

    return utmParameters.some((param) => queryKeys.includes(param));
  });

  const utmQuery = computed(() => {
    if (!hasUtmParameters.value) return {};

    return utmParameters.reduce((query, param) => {
      if (Object.prototype.hasOwnProperty.call(route.query, param)) {
        query[param] = route.query[param];
      }

      return query;
    }, {});
  });

  function getUrlWithUtm(url) {
    let newUrl;

    try {
      newUrl = new URL(url);
    } catch (_) {
      return url;
    }

    Object.keys(utmQuery.value).forEach((key) => {
      if (newUrl.searchParams.has(key)) return;

      const value = utmQuery.value[key];

      newUrl.searchParams.set(key, value);
    });

    return newUrl.href;
  }

  function getUtmValue(key) {
    return utmQuery.value[key] || null;
  }

  function getUtmString(updateArray) {
    const utmParams = Object.entries(utmQuery.value).map(([key, value]) => {
      const update = updateArray.find((item) => item.name === key);
      return update ? `${key}=${update.value}` : `${key}=${value}`;
    });

    // Add any updateArray elements that don't exist in current UTM parameters
    updateArray.forEach((item) => {
      if (!utmQuery.value[item.name]) {
        utmParams.push(`${item.name}=${item.value}`);
      }
    });

    if (!utmQuery.value.utm_medium) {
      utmParams.push('utm_medium=organic');
    }

    if (!utmQuery.value.utm_source) {
      utmParams.push('utm_source=websiteregistration');
    }

    return utmParams.join('&');
  }

  function regUtmChannel() {
    const utmMedium = getUtmValue('utm_medium')?.toLowerCase() || 'organic';
    let utmChannel = '1';

    switch (utmMedium) {
      case 'referral':
      case 'affiliate':
      case 'ibreferral':
      case 'ibreferralcn':
      case 'zalo':
        utmChannel = '2'; //ib
        break;

      case 'cpc':
      case 'email':
      case 'social':
      case 'direct':
      case 'display':
      case 'video':
      case 'sms':
      case 'podcast':
      case 'push':
      case 'remarketing':
      case 'programmatic':
      case 'influence':
        utmChannel = '3'; //digital acquisition
        break;

      case 'directories':
      case 'directory':
      case 'banners':
        utmChannel = '4'; //media buying
        break;

      default:
        utmChannel = '1'; // if not matched, set to organic
        break;
    }
    return utmChannel;
  }

  return {
    getUrlWithUtm,
    getUtmValue,
    getUtmString,
    regUtmChannel,
    hasUtmParameters,
  };
};
