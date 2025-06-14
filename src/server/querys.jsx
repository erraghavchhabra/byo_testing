export const aboutQuery = `*[_type == "about"][0]{
                    name,
                    aboutHeaderImage,
                    company_stats {
                        team_members,
                        years_in_business,
                        projects_completed
                    },
                    aboutGallery {
                        name,
                        title,
                        description,
                    },
                    whyByo[] {
                        name,
                        description,
                        image
                    },
                    capabilities {
                        title,
                        branding {
                        title,
                        capabilities[] { name }
                        },
                        digitalProducts {
                        title,
                        capabilities[] { name }
                        },
                        awards
                    }
}`;
export const galleryQuery = `*[_type == "gallery"][0]{
  title,
  images[]{
    "url": asset->url,
    alt
  }
}`;

// This query fetches only the 'multipleImages' field from the 'about' document's 'aboutGallery' section.

// This query fetches only the clients selected to be shown on the About Page
export const aboutClientsQuery = `*[_type == "clients"][0] {
  "startups": startups[is_show_aboutPage == true]{
    name,
    link,
    "imageUrl": image.asset->url
  },
  "smb": smb[is_show_aboutPage == true]{
    name,
    link,
    "imageUrl": image.asset->url
  },
  "enterprise": enterprise[is_show_aboutPage == true]{
    name,
    link,
    "imageUrl": image.asset->url
  }
}`;

export const servicesQuery = `*[_type == "services"][0]{
          servicesHeader {
            mainTitle,
            description
          },
          branding {
            title,
            description,
            image,
            brandingImage,
            capabilities[] { name }
          },
          digitalProducts {
            title,
            description,
            image,
            brandingImage,
            capabilities[] { name }
          },
          websites {
            title,
            description,
            image,
            brandingImage,
            capabilities[] { name }
          },
          content {
            title,
            description,
            image,
            brandingImage,
            capabilities[] { name }
          },
          development {
            title,
            description,
            image,
            brandingImage,
            capabilities[] { name }
          },
          industries {
            title,
            description,
            industriesList[] {
              title,
              names
            }
          }
}`;

export const clientsQuery = `*[_type == "clients"][0] {
  clientHeader {
    mainTitle,
    description
  },
  startups[] {
    name,
    link,
    "imageUrl": image.asset->url,
    is_show_aboutPage
  },
  smb[] {
    name,
    link,
    "imageUrl": image.asset->url,
    is_show_aboutPage
  },
  enterprise[] {
    name,
    link,
    "imageUrl": image.asset->url,
    is_show_aboutPage
  },
  comments[] {
    comment,
    user {
      name,
      "profileUrl": profile.asset->url
    }
  }
}`;

export const contactQuery = `*[_type == "contact"][0] {
  title,
  description,
  emails[] {
    title,
    email
  },
  socialLinks[] {
    name,
    link
  },
  "imageUrl": image.asset->url,
  address
}`;
export const faqQuery = `*[_type == "faq"][0] {
  sectionTitle,
  faqs[]{
    title,
    description
  }
}
`;
export const homeQuery = `*[_type == "home"][0]{
  heroTitle,
  introVideo{
    asset->{url}
  },
  services {
    description,
    list[] {
      title,
      description,
      image {
        asset->{
          url
        }
      }
    }
  },
  viewOurService {
    title,
    description
  },
  homeGalleryDescription
}`;

export const homeProjectsQuery = `
  *[_type == "projects" && is_show_homeScreen == true][0...4]{
    title,
    coverImage{
      asset->{url}
    }
  }
`;

export const allProjectsQuery = `
  *[_type == "projects"]{
    title,
    coverImage {
      asset -> {
        url
      }
    },
    category->{
             name
    },
  }
`;
export const allCategoriesQuery = `
  *[_type == "category"]{
    name
  }
`;

 export const singleProjectQuery = `
    *[_type == "projects" && title == $title][0]{
      title,
      coverImage{asset->{url}},
      mainImage{asset->{url}},
      description,
      category->{name},
      is_show_homeScreen,
      multiImages{
        select,
        images[]{asset->{url}}
      },
      video{asset->{url}},
      services{
        description,
        list[]{name}
      },
      problemAndChallenges{
        problem{
          description,
          points[]{title}
        },
        challenges{
          description,
          points[]{title}
        }
      },
      identity{
        title,
        description,
        images[]{asset->{url}}
      },
      interior{
        title,
        description,
        images[]{asset->{url}}
      },
      colors{
        title,
        description,
        images[]{asset->{url}}
      },
      packaging{
        title,
        description,
        images[]{asset->{url}}
      },
      iconography{
        title,
        description,
        images[]{asset->{url}}
      },
      planOfAction{
        title,
        description,
        image{asset->{url}}
      },
      other{
        title,
        description,
        images[]{asset->{url}}
      },
      strategySession{
        title,
        description,
        images[]{asset->{url}}
      },
      results{
        description,
        points[]{title},
        roi,
        customers,
        downloads,
        link
      },
      testimonials[]{
        comment,
        user{
          "profileUrl": profileUrl.asset->url,
          position,
          name
        }
      }
    }
  `