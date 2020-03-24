module.exports = {
  layout: 'reply',
  permalink: 'replies/{{ page.fileSlug }}.html',
  tags: ['reply'],
  vocab: 'entry',
  changefreq: 'monthly',
  priority: 0.8,
  eleventyComputed: {
    title: 'Reply: {{ date | date: dates.datetime_full }}',
    image: '{{ photo[0].url }}',
    target: '{{ page.url | prepend: app.url | pretty }}'
  }
};