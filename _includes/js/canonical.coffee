canonical = document.head.querySelector('link[rel=canonical]').href + location.search + location.hash

location.href = canonical if location.href isnt canonical and canonical
