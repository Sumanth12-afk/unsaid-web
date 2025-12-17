import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database with Indian companies...');

  const companies = [
    // IT Services & Consulting
    { name: 'Accenture India', slug: 'accenture-india', industry: 'IT Services & Consulting', location: 'Bangalore, India' },
    { name: 'Capgemini India', slug: 'capgemini-india', industry: 'IT Services & Consulting', location: 'Mumbai, India' },
    { name: 'Cognizant', slug: 'cognizant', industry: 'IT Services & Consulting', location: 'Chennai, India' },
    { name: 'Deloitte India', slug: 'deloitte-india', industry: 'Consulting & Professional Services', location: 'Mumbai, India' },
    { name: 'EY India', slug: 'ey-india', industry: 'Consulting & Professional Services', location: 'Bangalore, India' },
    { name: 'HCL Technologies', slug: 'hcl-technologies', industry: 'IT Services', location: 'Noida, India' },
    { name: 'Infosys', slug: 'infosys', industry: 'IT Services & Consulting', location: 'Bangalore, India' },
    { name: 'KPMG India', slug: 'kpmg-india', industry: 'Consulting & Audit', location: 'Mumbai, India' },
    { name: 'LTI Mindtree', slug: 'lti-mindtree', industry: 'IT Services', location: 'Mumbai, India' },
    { name: 'Mphasis', slug: 'mphasis', industry: 'IT Services', location: 'Bangalore, India' },
    { name: 'PwC India', slug: 'pwc-india', industry: 'Consulting & Audit', location: 'Bangalore, India' },
    { name: 'TCS', slug: 'tcs', industry: 'IT Services & Consulting', location: 'Mumbai, India' },
    { name: 'Tech Mahindra', slug: 'tech-mahindra', industry: 'IT Services', location: 'Pune, India' },
    { name: 'Wipro', slug: 'wipro', industry: 'IT Services & Consulting', location: 'Bangalore, India' },

    // Technology & Product Companies
    { name: 'Adobe India', slug: 'adobe-india', industry: 'Software & Technology', location: 'Bangalore, India' },
    { name: 'Amazon India', slug: 'amazon-india', industry: 'E-commerce & Technology', location: 'Bangalore, India' },
    { name: 'Apple India', slug: 'apple-india', industry: 'Technology & Consumer Electronics', location: 'Bangalore, India' },
    { name: 'Cisco India', slug: 'cisco-india', industry: 'Networking & Technology', location: 'Bangalore, India' },
    { name: 'Dell India', slug: 'dell-india', industry: 'Technology & Hardware', location: 'Bangalore, India' },
    { name: 'Freshworks', slug: 'freshworks', industry: 'SaaS & Software', location: 'Chennai, India' },
    { name: 'Google India', slug: 'google-india', industry: 'Technology & Internet', location: 'Bangalore, India' },
    { name: 'HP India', slug: 'hp-india', industry: 'Technology & Hardware', location: 'Bangalore, India' },
    { name: 'IBM India', slug: 'ibm-india', industry: 'Technology & Consulting', location: 'Bangalore, India' },
    { name: 'Intel India', slug: 'intel-india', industry: 'Semiconductors & Technology', location: 'Bangalore, India' },
    { name: 'Microsoft India', slug: 'microsoft-india', industry: 'Technology & Software', location: 'Hyderabad, India' },
    { name: 'Meta India', slug: 'meta-india', industry: 'Social Media & Technology', location: 'Hyderabad, India' },
    { name: 'Netflix India', slug: 'netflix-india', industry: 'Streaming & Entertainment', location: 'Mumbai, India' },
    { name: 'NVIDIA India', slug: 'nvidia-india', industry: 'Graphics & AI Technology', location: 'Pune, India' },
    { name: 'Oracle India', slug: 'oracle-india', industry: 'Software & Cloud', location: 'Bangalore, India' },
    { name: 'Qualcomm India', slug: 'qualcomm-india', industry: 'Semiconductors & Wireless', location: 'Bangalore, India' },
    { name: 'SAP Labs India', slug: 'sap-labs-india', industry: 'Enterprise Software', location: 'Bangalore, India' },
    { name: 'Salesforce India', slug: 'salesforce-india', industry: 'Cloud & CRM', location: 'Bangalore, India' },
    { name: 'Samsung India', slug: 'samsung-india', industry: 'Electronics & Technology', location: 'Bangalore, India' },
    { name: 'Uber India', slug: 'uber-india', industry: 'Ride Sharing & Technology', location: 'Bangalore, India' },
    { name: 'Zoho', slug: 'zoho', industry: 'SaaS & Software', location: 'Chennai, India' },

    // E-commerce & Retail
    { name: 'Flipkart', slug: 'flipkart', industry: 'E-commerce', location: 'Bangalore, India' },
    { name: 'Meesho', slug: 'meesho', industry: 'Social E-commerce', location: 'Bangalore, India' },
    { name: 'Myntra', slug: 'myntra', industry: 'Fashion E-commerce', location: 'Bangalore, India' },
    { name: 'Nykaa', slug: 'nykaa', industry: 'Beauty & E-commerce', location: 'Mumbai, India' },
    { name: 'Snapdeal', slug: 'snapdeal', industry: 'E-commerce', location: 'Delhi, India' },

    // Food & Delivery
    { name: 'Blinkit', slug: 'blinkit', industry: 'Quick Commerce', location: 'Gurugram, India' },
    { name: 'Dunzo', slug: 'dunzo', industry: 'Quick Delivery', location: 'Bangalore, India' },
    { name: 'Swiggy', slug: 'swiggy', industry: 'Food Delivery', location: 'Bangalore, India' },
    { name: 'Zepto', slug: 'zepto', industry: 'Quick Commerce', location: 'Mumbai, India' },
    { name: 'Zomato', slug: 'zomato', industry: 'Food Delivery & Restaurant Tech', location: 'Gurugram, India' },

    // Fintech & Banking
    { name: 'Axis Bank', slug: 'axis-bank', industry: 'Banking & Finance', location: 'Mumbai, India' },
    { name: 'CRED', slug: 'cred', industry: 'Fintech', location: 'Bangalore, India' },
    { name: 'HDFC Bank', slug: 'hdfc-bank', industry: 'Banking & Finance', location: 'Mumbai, India' },
    { name: 'ICICI Bank', slug: 'icici-bank', industry: 'Banking & Finance', location: 'Mumbai, India' },
    { name: 'Paytm', slug: 'paytm', industry: 'Fintech & Payments', location: 'Noida, India' },
    { name: 'PhonePe', slug: 'phonepe', industry: 'Fintech & Payments', location: 'Bangalore, India' },
    { name: 'Razorpay', slug: 'razorpay', industry: 'Fintech & Payments', location: 'Bangalore, India' },
    { name: 'SBI', slug: 'sbi', industry: 'Banking & Finance', location: 'Mumbai, India' },

    // EdTech & Learning
    { name: 'BYJU\'S', slug: 'byjus', industry: 'EdTech', location: 'Bangalore, India' },
    { name: 'Unacademy', slug: 'unacademy', industry: 'EdTech', location: 'Bangalore, India' },
    { name: 'upGrad', slug: 'upgrad', industry: 'EdTech', location: 'Mumbai, India' },
    { name: 'Vedantu', slug: 'vedantu', industry: 'EdTech', location: 'Bangalore, India' },

    // Travel & Hospitality
    { name: 'MakeMyTrip', slug: 'makemytrip', industry: 'Travel & Tourism', location: 'Gurugram, India' },
    { name: 'OYO', slug: 'oyo', industry: 'Hospitality & Travel', location: 'Gurugram, India' },
    { name: 'Ixigo', slug: 'ixigo', industry: 'Travel Tech', location: 'Gurugram, India' },

    // Media & Entertainment
    { name: 'Disney+ Hotstar', slug: 'hotstar', industry: 'Streaming & Entertainment', location: 'Mumbai, India' },
    { name: 'Sony India', slug: 'sony-india', industry: 'Electronics & Entertainment', location: 'Delhi, India' },
    { name: 'Zee Entertainment', slug: 'zee-entertainment', industry: 'Media & Broadcasting', location: 'Mumbai, India' },

    // Telecom
    { name: 'Airtel', slug: 'airtel', industry: 'Telecommunications', location: 'Delhi, India' },
    { name: 'Jio', slug: 'jio', industry: 'Telecommunications', location: 'Mumbai, India' },
    { name: 'Vi (Vodafone Idea)', slug: 'vodafone-idea', industry: 'Telecommunications', location: 'Mumbai, India' },

    // Automotive & Mobility
    { name: 'Ola', slug: 'ola', industry: 'Ride Sharing & Mobility', location: 'Bangalore, India' },
    { name: 'Ola Electric', slug: 'ola-electric', industry: 'Electric Vehicles', location: 'Bangalore, India' },
    { name: 'Tata Motors', slug: 'tata-motors', industry: 'Automotive', location: 'Mumbai, India' },
    { name: 'Mahindra & Mahindra', slug: 'mahindra', industry: 'Automotive', location: 'Mumbai, India' },

    // Startups & Unicorns
    { name: 'Browserstack', slug: 'browserstack', industry: 'Developer Tools', location: 'Mumbai, India' },
    { name: 'CarDekho', slug: 'cardekho', industry: 'Automotive Tech', location: 'Jaipur, India' },
    { name: 'Chargebee', slug: 'chargebee', industry: 'SaaS & Billing', location: 'Chennai, India' },
    { name: 'ClearTax', slug: 'cleartax', industry: 'Fintech & Tax', location: 'Bangalore, India' },
    { name: 'Druva', slug: 'druva', industry: 'Cloud Data Protection', location: 'Pune, India' },
    { name: 'Dream11', slug: 'dream11', industry: 'Fantasy Sports & Gaming', location: 'Mumbai, India' },
    { name: 'Delhivery', slug: 'delhivery', industry: 'Logistics & Supply Chain', location: 'Gurugram, India' },
    { name: 'Groww', slug: 'groww', industry: 'Fintech & Investing', location: 'Bangalore, India' },
    { name: 'HighRadius', slug: 'highradius', industry: 'Enterprise SaaS', location: 'Hyderabad, India' },
    { name: 'InMobi', slug: 'inmobi', industry: 'Mobile Advertising', location: 'Bangalore, India' },
    { name: 'Lenskart', slug: 'lenskart', industry: 'Eyewear & Retail', location: 'Faridabad, India' },
    { name: 'MPL', slug: 'mpl', industry: 'Gaming & Esports', location: 'Bangalore, India' },
    { name: 'PolicyBazaar', slug: 'policybazaar', industry: 'Insurance Tech', location: 'Gurugram, India' },
    { name: 'Postman', slug: 'postman', industry: 'Developer Tools & API', location: 'Bangalore, India' },
    { name: 'Rapido', slug: 'rapido', industry: 'Bike Taxi & Mobility', location: 'Bangalore, India' },
    { name: 'ShareChat', slug: 'sharechat', industry: 'Social Media', location: 'Bangalore, India' },
    { name: 'Urban Company', slug: 'urban-company', industry: 'Home Services', location: 'Gurugram, India' },

    // Manufacturing & Industrial
    { name: 'Reliance Industries', slug: 'reliance-industries', industry: 'Conglomerate', location: 'Mumbai, India' },
    { name: 'Larsen & Toubro', slug: 'larsen-toubro', industry: 'Engineering & Construction', location: 'Mumbai, India' },
    { name: 'Adani Group', slug: 'adani-group', industry: 'Infrastructure & Logistics', location: 'Ahmedabad, India' },
  ];

  let created = 0;
  let updated = 0;

  for (const company of companies) {
    const result = await prisma.company.upsert({
      where: { slug: company.slug },
      update: {},
      create: {
        name: company.name,
        slug: company.slug,
        industry: company.industry,
        location: company.location,
      },
    });
    
    if (result.created_at.getTime() === result.updated_at.getTime()) {
      created++;
      console.log(`✅ Created: ${result.name}`);
    } else {
      updated++;
    }
  }

  console.log(`\n🎉 Seeding completed!`);
  console.log(`📊 ${created} companies created, ${updated} already existed`);
  console.log(`📈 Total companies in database: ${companies.length}`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

